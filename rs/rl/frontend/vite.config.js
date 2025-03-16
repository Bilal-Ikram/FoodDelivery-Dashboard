import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175,   //run on port 5173
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // Backend server
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove /api prefix
      },
    },
  },
})
