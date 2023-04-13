const { Octokit } = require("@octokit/rest");
const octokit = new Octokit();

module.exports = async function () {
  const { data } = await octokit.rest.activity.listPublicOrgEvents({
    org: "tus",
    per_page: 20,
    mediaType: {
      format: "html",
    },
  });

  return data;
};
