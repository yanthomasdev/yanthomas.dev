import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";

import expressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  site: "https://www.yanthomas.dev",
  integrations: [tailwind(), expressiveCode({
    theme: 'dracula',
  }), mdx()],
  experimental: {
    assets: true
  }
});