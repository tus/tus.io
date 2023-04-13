/**
 * @param {string} source
 */
module.exports = async function getGithubActivity(source) {
  let feed;
  let date;

  if (typeof window !== "undefined") {
    feed = localStorage.getItem("on-the-githubs-feed-" + source);
    feed = feed ? JSON.parse(feed) : null;
    date = localStorage.getItem("on-the-githubs-date-" + source);
    date = date ? Number(date) : null;
  }

  const now = new Date().getTime() / 1000;
  const url = "https://api.github.com/" + source + "/events?per_page=20";

  if (
    feed &&
    feed?.data &&
    date &&
    !Number.isNaN(date) &&
    now - date < 3 * 60
  ) {
    return feed;
  }

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });

    let json = await res.json();

    if (json?.message) {
      throw new Error("GitHub says: " + json.message + " for url: " + url);
    }

    json = json.slice(0, 20);

    if (typeof window !== "undefined") {
      localStorage.setItem(
        "on-the-githubs-feed-" + source,
        JSON.stringify(json)
      );
      localStorage.setItem("on-the-githubs-date-" + source, `${now}`);
    }

    return json;
  } catch (e) {
    console.error(e);
  }
};
