const bundlerPlugin = require("@11ty/eleventy-plugin-bundle");
const pluginWebc = require("@11ty/eleventy-plugin-webc");
const postcss = require("postcss");
const csso = require("postcss-csso");
const presetEnv = require("postcss-preset-env");
const autoprefixer = require("autoprefixer");

/**
 * @param {import("@11ty/eleventy").UserConfig} eleventyConfig
 **/
module.exports = function (eleventyConfig) {
  // Use WebC for global components
  eleventyConfig.addPlugin(pluginWebc);

  // Setup bundler plugin
  eleventyConfig.addPlugin(bundlerPlugin, {
    transforms: [
      async function transform(content) {
        if (this.type === "css") {
          let result = await postcss([autoprefixer, presetEnv, csso]).process(
            content,
            { from: this.page.inputPath, to: null }
          );
          return result.css;
        }
      },
    ],
  });

  /**
   * Why copy the /public directory?
   *
   * Slinkity uses Vite (https://vitejs.dev) under the hood for processing styles and JS resources
   * This tool encourages a /public directory for your static assets like social images
   * To ensure this directory is discoverable by Vite, we copy it to our 11ty build output like so:
   */
  eleventyConfig.addPassthroughCopy("public");

  return {
    htmlTemplateEngine: "webc",
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
