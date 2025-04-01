import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // Force server to run even with errors
    hmr: true,
    watch: {
      usePolling: true, // Helps on some systems
    },
  },
  build: {
    // Continue building despite errors
    rollupOptions: {
      onwarn(warning, warn) {
        console.warn(warning.message); // Log warnings instead of failing
      },
    },
  },
});