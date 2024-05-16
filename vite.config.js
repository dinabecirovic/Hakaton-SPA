import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import svgLoader from "vite-svg-loader";

import vue from '@vitejs/plugin-vue'
const svgoPlugins = ["preset-default", "inlineStyles", "prefixIds", "removeViewBox"];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgLoader({
      svgoConfig: {
          plugins: svgoPlugins,
      },
  }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
