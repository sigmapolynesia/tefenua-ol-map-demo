import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createHtmlPlugin } from 'vite-plugin-html'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  build: {
    outDir: '../demo'
  },
  root: 'src',
  plugins: [
    react(),
    createHtmlPlugin({
      minify: true,
      entry: 'index.js'
    })
  ]
}))
