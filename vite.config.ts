import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['eventemitter3'], // Ensure Vite includes eventemitter3 in the dependency optimization
  },
  build: {
    commonjsOptions: {
      include: [/eventemitter3/, /node_modules/], // Handle CommonJS modules correctly
    },
  },
});