import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import UnoCSS from 'unocss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    UnoCSS({
      configFile: './uno.config.ts',
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
