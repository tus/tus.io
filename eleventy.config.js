const slinkity = require("slinkity");
const preact = require("@slinkity/preact");

/**
 * @param {import("@11ty/eleventy").UserConfig} eleventyConfig
 **/
module.exports = function (eleventyConfig) {
  eleventyConfig.ignores.add("src/lib/**");

  eleventyConfig.addPlugin(
    slinkity.plugin,
    slinkity.defineConfig({
      renderers: [preact()],
    })
  );

  /**
   * Why copy the /public directory?
   *
   * Slinkity uses Vite (https://vitejs.dev) under the hood for processing styles and JS resources
   * This tool encourages a /public directory for your static assets like social images
   * To ensure this directory is discoverable by Vite, we copy it to our 11ty build output like so:
   */
  eleventyConfig.addPassthroughCopy("public");

  return {
    dir: {
      /**
       * Why set an input directory?
       *
       * By default, 11ty will treat the base of your project as the input.
       * This can have some nasty consequences, like accidentally copying your README.md as a route!
       * You can manually ignore certain files from the build output. But to keep things simple,
       * We recommend setting an input directory like so:
       */
      input: "src",
    },
  };
};
