import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import UnoCSS from 'unocss/vite'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  root: path.resolve(__dirname, 'src'),
  base: (process.env.GITHUB_PAGES ? './FrameSnap' : './'),
  plugins: [
    react(),
    UnoCSS({
      configFile: path.resolve(__dirname, 'uno.config.ts'),
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
})
