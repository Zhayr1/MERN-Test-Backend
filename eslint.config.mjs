import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.es2021,
        process: true,
        jest: true,
        console: true,
        module: true,
      },
    },
  },
  pluginJs.configs.recommended,
];
