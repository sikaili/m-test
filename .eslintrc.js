module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: [
    "simple-import-sort", "react",
  ],
  rules: {
    "react/jsx-filename-extension": "off",
    "react/forbid-prop-types": "off",
    quotes: "off",
    "no-param-reassign": "off",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "import/prefer-default-export": "off",
    "import/no-named-as-default": "off",
    "consistent-return": "off",
    "no-shadow": "off",
  },
};
