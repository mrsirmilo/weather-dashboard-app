import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  outDir: "dist",
  build: {
    assets: "public",
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          assetFileNames: "[name].[hash][extname]",
        },
      },
    },
  },
});