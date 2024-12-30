import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  integrations: [tailwind()],
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
