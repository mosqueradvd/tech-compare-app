import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-select', '@radix-ui/react-badge'],
          utils: ['lucide-react', 'clsx', 'tailwind-merge'],
        },
      },
    },
    sourcemap: mode === 'development',
    minify: mode === 'production' ? 'terser' : false,
    target: 'esnext',
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react'],
  },
}));
