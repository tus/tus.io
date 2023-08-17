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
      version: '16.0',
      pragma: 'h',
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
      impliedStrict: true,
    },
    project: true,
    tsconfigRootDir: __dirname,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'prettier',
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/consistent-type-exports': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-import-type-side-effects': 'error',
  },
  overrides: [
    {
      files: ['.eslintrc.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      extends: ['plugin:astro/recommended', 'prettier'],
      files: ['*.astro'],
      plugins: ['astro'],
      // Allows Astro components to be parsed.
      parser: 'astro-eslint-parser',
      // Parse the script in `.astro` as TypeScript by adding the following configuration.
      // It's the setting you need when using TypeScript.
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
      rules: {
        'react/self-closing-comp': 'off',
      },
    },
    {
      files: ['*.tsx'],
      plugins: ['react', 'react-hooks'],
      rules: {
        /**
         * Preact / JSX rules
         * From: https://github.com/preactjs/eslint-config-preact/blob/master/index.js
         */
        'react/no-deprecated': 'error',
        'react/react-in-jsx-scope': 'off', // handled this automatically
        'react/display-name': ['warn', { ignoreTranspilerName: false }],
        'react/jsx-no-bind': [
          1,
          {
            ignoreRefs: true,
            allowFunctions: true,
            allowArrowFunctions: true,
          },
        ],
        'react/jsx-no-comment-textnodes': 'error',
        'react/jsx-no-duplicate-props': 'error',
        'react/jsx-no-target-blank': 'error',
        'react/jsx-no-undef': 'error',
        'react/jsx-tag-spacing': ['error', { beforeSelfClosing: 'always' }],
        'react/jsx-uses-react': 'error', // debatable
        'react/jsx-uses-vars': 'error',
        'react/jsx-key': ['error', { checkFragmentShorthand: true }],
        'react/self-closing-comp': 'error',
        'react/prefer-es6-class': 'error',
        'react/prefer-stateless-function': 'warn',
        'react/require-render-return': 'error',
        'react/no-danger': 'warn',
        // Legacy APIs not supported in Preact:
        'react/no-did-mount-set-state': 'error',
        'react/no-did-update-set-state': 'error',
        'react/no-find-dom-node': 'error',
        'react/no-is-mounted': 'error',
        'react/no-string-refs': 'error',

        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
      },
    },
  ],
}
