import { defineConfig } from 'vite'
import path, { resolve } from 'node:path'
import electron from 'vite-plugin-electron/simple'
import react from '@vitejs/plugin-react'
import tsConfigPaths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: false,
    manifest: true,
    outDir:"dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname,"index.html"),
        studio_main: resolve(__dirname,"studio.html"),
        webcam_main: resolve(__dirname,"webcam.html")
      }
    }
  },
  server: {
    proxy: {
      "/api": {target: "http://localhost:3000/api",changeOrigin: true,
        rewrite: (path) =>path.replace(/^\/api/,''),
      },
    },
  },
  plugins: [
    react(),
    tsConfigPaths(),
    electron({
      main: {
        // Shortcut of `build.lib.entry`.
        entry: 'electron/main.ts',
      },
      preload: {
        // Shortcut of `build.rollupOptions.input`.
        // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
        input: path.join(__dirname, 'electron/preload.ts'),
      },
      // Ployfill the Electron and Node.js API for Renderer process.
      // If you want use Node.js in Renderer process, the `nodeIntegration` needs to be enabled in the Main process.
      // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
      renderer: process.env.NODE_ENV === 'test'
        // https://github.com/electron-vite/vite-plugin-electron-renderer/issues/78#issuecomment-2053600808
        ? undefined
        : {},
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})