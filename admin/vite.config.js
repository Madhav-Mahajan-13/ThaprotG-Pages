import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    host: true, // 👈 Allows access from any network (0.0.0.0)
    port: 5173, // You can change this to any port you prefer
    strictPort: true, // Ensures Vite uses this exact port
    cors: true, // Enable CORS (if needed)
    allowedHosts:true
  }
})
