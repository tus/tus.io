import { doGitHubRequest } from "./getGitHubData";

export async function getGitHubActivity() {
	try {
		const { data } = await doGitHubRequest("GET /orgs/{org}/events", {
			org: "tus",
			per_page: 20,
			mediaType: {
				format: "html",
			},
		});

		return data;
	} catch (error) {
		console.log(error);
		return [];
	}
}
