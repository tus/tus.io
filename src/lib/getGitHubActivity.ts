export async function getGitHubActivity() {
  try {
    const { Octokit } = await import("@octokit/rest");
    const octokit = new Octokit();

    const { data } = await octokit.rest.activity.listPublicOrgEvents({
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
