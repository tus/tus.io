/**
 * @typedef {{ date: Date; fileSlug: string }} PageData
 * @typedef {{ page: PageData, permalink?: string }} Data
 */

module.exports = {
  eleventyComputed: {
    /**
     * @param {Data} data
     */
    permalink(data) {
      if ("permalink" in data.page && data.page.permalink) {
        return data.permalink;
      }

      let [year, month, day] = data.page.date
        .toISOString()
        .slice(0, 10)
        .split("-");

      return `/blog/${year}/${month}/${day}/${data.page.fileSlug}/index.html`;
    },
  },
  tags: ["post"],
};
