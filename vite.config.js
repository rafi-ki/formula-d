import { defineConfig } from 'vite'
import { createVuePlugin as vue } from "vite-plugin-vue2";
import vuetify from "./src/plugins/vuetify";
const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vuetify({ autoImport: true }),],
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `
  //
  //             @import "/assets/scss/_variables.scss";
  //           `
  //     }
  //   }
  // }
})
