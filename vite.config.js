import { defineConfig } from 'vite'
import { globSync } from 'node:fs'

export default defineConfig({
  root: 'src',
  base: './', // relative paths, works in any FTP subdirectory
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: { input: globSync('src/**/index.html') },
  },
})
