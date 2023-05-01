const typescript = require("@typescript-eslint/eslint-plugin");
const react = require("eslint-plugin-react");
const hooks = require("eslint-plugin-react-hooks");
const js = require("@eslint/js");
const prettier = require("eslint-config-prettier");
const globals = require("globals");

module.exports = [
  js.configs.recommended,
  prettier,
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx,mts}"],
    languageOptions: {
      parser: require("@typescript-eslint/parser"),
      parserOptions: {
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
          modules: true,
          impliedStrict: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      react: {
        version: "16.0",
        pragma: "h",
      },
    },
    plugins: { "@typescript-eslint": typescript, react, "react-hooks": hooks },
    rules: {
      ...typescript.configs["eslint-recommended"].rules,
      ...typescript.configs.recommended.rules,
      /**
       * Preact / JSX rules
       * From: https://github.com/preactjs/eslint-config-preact/blob/master/index.js
       */
      "react/no-deprecated": 2,
      "react/react-in-jsx-scope": 0, // handled this automatically
      "react/display-name": [1, { ignoreTranspilerName: false }],
      "react/jsx-no-bind": [
        1,
        {
          ignoreRefs: true,
          allowFunctions: true,
          allowArrowFunctions: true,
        },
      ],
      "react/jsx-no-comment-textnodes": 2,
      "react/jsx-no-duplicate-props": 2,
      "react/jsx-no-target-blank": 2,
      "react/jsx-no-undef": 2,
      "react/jsx-tag-spacing": [2, { beforeSelfClosing: "always" }],
      "react/jsx-uses-react": 2, // debatable
      "react/jsx-uses-vars": 2,
      "react/jsx-key": [2, { checkFragmentShorthand: true }],
      "react/self-closing-comp": 2,
      "react/prefer-es6-class": 2,
      "react/prefer-stateless-function": 1,
      "react/require-render-return": 2,
      "react/no-danger": 1,
      // Legacy APIs not supported in Preact:
      "react/no-did-mount-set-state": 2,
      "react/no-did-update-set-state": 2,
      "react/no-find-dom-node": 2,
      "react/no-is-mounted": 2,
      "react/no-string-refs": 2,

      "react-hooks/rules-of-hooks": 2,
      "react-hooks/exhaustive-deps": 1,
    },
  },
  {
    files: ["eslint.config.js", "eleventy.config.js"],
    rules: {
      "@typescript-eslint/no-var-requires": "off",
    },
  },
  {
    ignores: ["node_modules/", "_site/", ".yarn/", "yarn.lock"],
  },
];
