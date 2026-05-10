import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'not IE 11', 'chrome 49'],
      renderLegacyChunks: true,
      polyfills: true
    }),
  ],
  build: {
    target: 'es5',
    minify: 'terser', // Terser bolje čisti kod za stare browsere
    cssTarget: 'chrome49',
    rollupOptions: {
      output: {
        format: 'iife', // Ovo je najstariji i najsigurniji format za učitavanje
      }
    }
  }
})