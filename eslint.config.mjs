import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin"; // Certifique-se de que o nome do pacote está correto

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: globals.browser
    },
    rules: {
      "@typescript-eslint/ban-types": "off"
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended
];