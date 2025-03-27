// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default withNuxt(
  // Your custom configs here
  eslintPluginPrettierRecommended,
  {
    rules: {
      "prettier/prettier": [
        "error",
        {
          printWidth: 120, // Matches your Prettier config
          bracketSpacing: true,
          trailingComma: "all",
          singleQuote: false,
          semi: true,
          endOfLine: "auto",
          vueIndentScriptAndStyle: false,
          htmlWhitespaceSensitivity: "ignore",
        },
      ],
    },
  },
);
