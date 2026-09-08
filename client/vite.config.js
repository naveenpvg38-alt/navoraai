import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      },
      '/auth': {
        target: 'http://localhost:5000',
        changeOrigin: true
      },
      '/planner': {
        target: 'http://localhost:5000',
        changeOrigin: true
      },
      '/plans': {
        target: 'http://localhost:5000',
        changeOrigin: true
      },
      '/profile': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
