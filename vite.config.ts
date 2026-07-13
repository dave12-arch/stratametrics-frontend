import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('supabase')) {
              return 'vendor-supabase';
            }
            if (id.includes('react-router')) {
              return 'vendor-router';
            }
            if (id.includes('lucide')) {
              return 'vendor-lucide';
            }
            return 'vendor';
          }
        },
      },
    },
  },
})
