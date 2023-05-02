module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  globals: {
    browser: true,
    node: true,
  },
  settings: {
    react: {
      version: "16.0",
      pragma: "h",
    },
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      modules: true,
      impliedStrict: true,
    },
    project: true,
    tsconfigRootDir: __dirname,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier",
  ],
  plugins: ["@typescript-eslint", "react", "react-hooks"],
  rules: {
    /**
     * Preact / JSX rules
     * From: https://github.com/preactjs/eslint-config-preact/blob/master/index.js
     */
    "react/no-deprecated": "error",
    "react/react-in-jsx-scope": "off", // handled this automatically
    "react/display-name": ["warn", { ignoreTranspilerName: false }],
    "react/jsx-no-bind": [
      1,
      {
        ignoreRefs: true,
        allowFunctions: true,
        allowArrowFunctions: true,
      },
    ],
    "react/jsx-no-comment-textnodes": "error",
    "react/jsx-no-duplicate-props": "error",
    "react/jsx-no-target-blank": "error",
    "react/jsx-no-undef": "error",
    "react/jsx-tag-spacing": ["error", { beforeSelfClosing: "always" }],
    "react/jsx-uses-react": "error", // debatable
    "react/jsx-uses-vars": "error",
    "react/jsx-key": ["error", { checkFragmentShorthand: true }],
    "react/self-closing-comp": "error",
    "react/prefer-es6-class": "error",
    "react/prefer-stateless-function": "warn",
    "react/require-render-return": "error",
    "react/no-danger": "warn",
    // Legacy APIs not supported in Preact:
    "react/no-did-mount-set-state": "error",
    "react/no-did-update-set-state": "error",
    "react/no-find-dom-node": "error",
    "react/no-is-mounted": "error",
    "react/no-string-refs": "error",

    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",

    "@typescript-eslint/consistent-type-exports": "error",
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/no-import-type-side-effects": "error",
  },
  overrides: [
    {
      files: ["eslint.config.js", "eleventy.config.js", "src/_data/*.js"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
  ],
};
