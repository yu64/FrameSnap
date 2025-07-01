import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import UnoCSS from 'unocss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: (process.env.GITHUB_PAGES ? './FrameSnap' : './'),
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
  build: {
    outDir: './dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `modules/[name].js`,
        assetFileNames: (assetInfo) => {

          for(let name of assetInfo.names)
          {
            if(/\.( gif|jpeg|jpg|png|svg|webp| )$/.test(name))
            {
              return 'assets/images/[name].[ext]';
            }

            if(/\.css$/.test(name))
            {
              return 'assets/css/[name].[ext]';
            }
          }

          return 'assets/[name].[ext]';
        }
      }
    }
  },
})
