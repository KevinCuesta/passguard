import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.GITHUB_PAGES === 'true' ? '/passguard/' : '/',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('@zxcvbn-ts/language-common')) return 'zxcvbn-common-dictionary'
          if (id.includes('@zxcvbn-ts/language-es-es')) return 'zxcvbn-spanish-dictionary'
          if (id.includes('@zxcvbn-ts/core')) return 'zxcvbn-engine'
        },
      },
    },
  },
})
