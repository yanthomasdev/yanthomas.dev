import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import expressiveCode from "astro-expressive-code";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://www.yanthomas.dev",
  integrations: [tailwind(), expressiveCode({
    theme: 'dracula'
  }), mdx(), sitemap()],
  experimental: {
    assets: true
  }
});