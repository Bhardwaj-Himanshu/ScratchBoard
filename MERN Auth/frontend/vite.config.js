import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port:3000,
    // and just so we do not redirect constantly for sending request to backend server on port 5000
    proxy:{
      '/api':{
        target:'http://localhost:5000',
        changeOrigin:true
      }
    }
  }
})
