module.exports = {
    extends: [
        "standard-with-typescript",
        "next/core-web-vitals",
        "plugin:prettier/recommended",
        "prettier",
    ],
    plugins: ["prettier"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "./tsconfig.json",
    },

    rules: {},
};
