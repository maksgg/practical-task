import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: {
      globals: globals.browser,
    },
    extends: [js.configs.recommended],
    rules: {
      "prefer-const": "error",
    },
    "prettier/prettier": [
      "error",
      {
        singleQuote: true,
        semi: true,
        trailingComma: "all",
        printWidth: 80,
      },
    ],
  },
  ...tseslint.configs.recommended,
]);
