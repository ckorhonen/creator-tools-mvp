import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    // Ensure proper module format for Cloudflare Pages
    target: 'es2020',
    // Optimize bundle for production
    minify: 'esbuild',
    // Ensure chunks are properly generated
    rollupOptions: {
      output: {
        manualChunks: undefined,
        // Ensure proper asset naming
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
    // Fail build on warnings to catch issues early
    chunkSizeWarningLimit: 1000,
  },
  // Explicit base path for Cloudflare Pages
  base: '/',
  // Ensure proper environment variable handling
  envPrefix: 'VITE_',
})
