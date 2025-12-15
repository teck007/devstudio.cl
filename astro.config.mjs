import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from '@astrojs/react';

export default defineConfig({
  output: 'server',
  integrations: [tailwind(), react()],
  vite: {
    resolve: {
      alias: {
        '@components': '/src/components',
        '@images': '/images',
        '@icons': '/src/assets/icons',
      },
    },
  },
});