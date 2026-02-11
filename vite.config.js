import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // '/api': 'http://localhost:7000'
      '/api': 'https://voting-system-backend-3msh.onrender.com'

    },
  },
  plugins: [react()],
})
