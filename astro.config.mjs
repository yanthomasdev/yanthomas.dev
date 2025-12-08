import remarkAsides from "#scripts/asides.js";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import expressiveCode from "astro-expressive-code";
import { defineConfig } from "astro/config";
import remarkDirective from "remark-directive";

// https://astro.build/config
export default defineConfig({
	site: "https://yanthomas.dev",
	trailingSlash: "always",
	integrations: [
		expressiveCode({
			themes: ["catppuccin-macchiato"],
			styleOverrides: {
				borderRadius: "0",
				uiFontFamily: "'Space Mono', monospace",
				uiFontSize: "var(--font-size--2)",
				codeFontFamily: "'Space Mono', monospace",
				codeFontSize: "var(--font-size--2)",
			},
		}),
		sitemap(),
		mdx(),
	],
	markdown: {
		remarkPlugins: [remarkDirective, remarkAsides],
	},
	prefetch: {
		prefetchAll: true,
		defaultStrategy: "viewport",
	},
	experimental: {
		contentIntellisense: true,
		svgo: true,
		clientPrerender: true,
	},
});
