import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from '@astrojs/react';
import node from '@astrojs/node';

export default defineConfig({
  output: 'server',
  integrations: [tailwind(), react()],
  adapter: node({
    mode: 'standalone',
  }),
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