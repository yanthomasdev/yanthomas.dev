import remarkAsides from "#scripts/asides.js";
import mdx from "@astrojs/mdx";
import expressiveCode from "astro-expressive-code";
import { defineConfig, fontProviders } from "astro/config";
import remarkDirective from "remark-directive";

// https://astro.build/config
export default defineConfig({
	site: "https://yanthomas.dev",
	integrations: [
		expressiveCode({
			themes: ["catppuccin-macchiato"],
			styleOverrides: {
				borderRadius: "0",
				uiFontFamily: "var(--font-space-mono)",
				uiFontSize: "var(--font-size--2)",
				codeFontFamily: "var(--font-space-mono)",
				codeFontSize: "var(--font-size--2)",
			},
		}),
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
		fonts: [{
			provider: fontProviders.google(),
			name: "Space Mono",
			cssVariable: "--font-space-mono",
			weights: ["400", "700"],
			styles: ["normal", "italic"],
			subsets: ["latin"],
			fallbacks: ["monospace"],
		}],
	},
});
