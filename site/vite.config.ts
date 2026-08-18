import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";

// Project Pages site: served at https://gad-lang.github.io/prism-gad/
export default defineConfig({
  base: "/prism-gad/",
  plugins: [vue(), vuetify({ autoImport: true })],
});
