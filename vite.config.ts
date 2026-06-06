import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': resolve(__dirname, './src') },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@supabase')) return 'supabase';
            if (id.includes('@tanstack')) return 'query-vendor';
            if (id.includes('framer-motion') || id.includes('lucide-react')) return 'ui-vendor';
            if (id.includes('react')) return 'react-vendor';
          }
        },
      },
    },
  },
});
