import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteSingleFile } from "vite-plugin-singlefile"
const path = require("path")

export default defineConfig({
  base: '',
  plugins: [vue(), viteSingleFile()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    }
  }
})
