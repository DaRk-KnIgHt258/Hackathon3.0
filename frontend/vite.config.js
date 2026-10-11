import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    watch: {
      usePolling: true,
    },
    proxy: {
      // Forward all /api/* calls to the FastAPI backend during development.
      // In Docker Compose: VITE_PROXY_BACKEND_URL=http://backend:8000
      // In local shell: defaults to http://localhost:8000
      '/api': {
        target: process.env.VITE_PROXY_BACKEND_URL || 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
