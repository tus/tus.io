import { effect, signal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import styles from "./RequestViewer.module.css";

declare global {
	interface XMLHttpRequest {
		_requestDetails: {
			id: string;
			method: string;
			url: string | URL;
			headers: string[];
			time: Date;
			bodySize: number;
			isTusRequest: boolean;
		};
	}
}

const RESPONSE_HEADERS = [
	"Location",
	"Tus-Resumable",
	"Upload-Offset",
	"Upload-Length",
	"Upload-Metadata",
];

const traffic = signal<XMLHttpRequest[]>([]);

function updateTraffic(xhr: XMLHttpRequest) {
	let index = traffic.value.findIndex(
		(d) => d._requestDetails.id === xhr._requestDetails.id
	);
	if (index === -1) index = traffic.value.length;
	const updated = [...traffic.value];
	updated[index] = xhr;
	traffic.value = updated;
}

if (typeof window !== "undefined" && window.XMLHttpRequest) {
	const xhrOpen = XMLHttpRequest.prototype.open;
	const xhrSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
	const xhrSend = XMLHttpRequest.prototype.send;

	XMLHttpRequest.prototype.open = function (method, url, ...args) {
		this._requestDetails = {
			id:
				crypto && "randomUUID" in crypto
					? crypto.randomUUID()
					: `${Math.round(Math.random() * 1e9)}`,
			method: method.toUpperCase(),
			url: url,
			headers: [],
			time: null,
			bodySize: null,
			isTusRequest: false,
		};

		xhrOpen.apply(this, [method, url, ...args]);
		updateTraffic(this);
	};

	XMLHttpRequest.prototype.setRequestHeader = function (name, value) {
		if (name.toLowerCase() === "tus-resumable") {
			this._requestDetails.isTusRequest = true;
		}

		this._requestDetails.headers.push(`${name}: ${value}`);
		xhrSetRequestHeader.call(this, name, value);
	};

	XMLHttpRequest.prototype.send = function (data) {
		if (!this._requestDetails.isTusRequest) {
			xhrSend.call(this, data);
			return;
		}

		if (data !== null) {
			this._requestDetails.bodySize = data.size;
		}

		this._requestDetails.time = new Date();

		this.addEventListener("load", () => {
			this._responseDetails = {
				status: this.status + " " + this.statusText,
				headers: [],
				time: new Date(),
			};

			RESPONSE_HEADERS.forEach((name) => {
				const value = this.getResponseHeader(name);
				if (value !== null) {
					this._responseDetails.headers.push(`${name}: ${value}`);
				}
			});

			updateTraffic(this);
		});

		xhrSend.call(this, data);
		updateTraffic(this);
	};
}

export function RequestViewer() {
	return (
		<div>
			{traffic.value.length === 0 && (
				<p class={styles.placeholder}>
					Start an upload to see a list of outgoing HTTP requests and incoming
					responses.
				</p>
			)}

			{traffic.value.map((xhr) => {
				const req = xhr._requestDetails;
				const res = xhr._responseDetails;

				return (
					<div key={req.id} class={styles.request}>
						<div class={styles.httpMethodUrl}>
							<span class={styles.httpMethod}>{req.method}</span> {req.url}
						</div>
						<div class={styles.httpBlock}>
							<div class={styles.httpDesc}>
								<b>Request</b> (sent at {req.time?.toLocaleTimeString()})
							</div>
							<div class={styles.requestInfo}>
								<div class={styles.headers}>
									{req.headers.map((h) => (
										<p>{h}</p>
									))}
								</div>

								<p>
									{req.bodySize
										? `[Binary body with ${req.bodySize} bytes]`
										: "[No body sent]"}
								</p>
							</div>
						</div>
						<div class={styles.httpBlock}>
							{res ? (
								<>
									<div class={styles.httpDesc}>
										<b>Response</b> (received at {res.time.toLocaleTimeString()}
										)
									</div>
									<div class={styles.requestInfo}>
										{res.status}
										<div class={styles.headers}>
											{res.headers.map((h) => (
												<p>{h}</p>
											))}
										</div>
									</div>
								</>
							) : (
								<div class={styles.httpDesc}>
									<b>Response</b> (not yet received)
								</div>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
}
