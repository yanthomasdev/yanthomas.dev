import remarkBoxes from "#plugins/boxes.ts";
import rehypeTables from "#plugins/tables.ts";
import { rehypeHeadingIds, unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import { defineConfig, envField, fontProviders } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkDirective from "remark-directive";

export default defineConfig({
	site: "https://yanthomas.dev",
	trailingSlash: "always",
	build: { inlineStylesheets: "always" },
	redirects: { "/articles": "/#articles" },
	env: {
		schema: {
			GITHUB_TOKEN: envField.string({ context: "server", access: "secret", optional: true }),
		},
	},
	integrations: [
		expressiveCode(),
		sitemap(),
		mdx(),
		icon({ include: { pixel: ["github", "bluesky", "x"] } }),
	],
	markdown: {
		processor: unified({
			remarkPlugins: [remarkDirective, remarkBoxes],
			rehypePlugins: [
				rehypeHeadingIds,
				[
					rehypeAutolinkHeadings,
					{
						behavior: "wrap",
						test: (node) => ["h2", "h3"].includes(node.tagName),
						properties: { className: ["anchor"] },
					},
				],
				rehypeTables,
			],
		}),
	},
	prefetch: {
		prefetchAll: true,
		defaultStrategy: "hover",
	},
	fonts: [
		{
			provider: fontProviders.local(),
			name: "Atkinson Hyperlegible Next",
			cssVariable: "--font-read",
			fallbacks: ["system-ui", "sans-serif"],
			options: {
				variants: [
					{
						weight: 400,
						style: "normal",
						src: [
							"@fontsource/atkinson-hyperlegible-next/files/atkinson-hyperlegible-next-latin-400-normal.woff2",
						],
					},
					{
						weight: 400,
						style: "italic",
						src: [
							"@fontsource/atkinson-hyperlegible-next/files/atkinson-hyperlegible-next-latin-400-italic.woff2",
						],
					},
					{
						weight: 600,
						style: "normal",
						src: [
							"@fontsource/atkinson-hyperlegible-next/files/atkinson-hyperlegible-next-latin-600-normal.woff2",
						],
					},
				],
			},
		},
		{
			provider: fontProviders.local(),
			name: "Atkinson Hyperlegible Mono",
			cssVariable: "--font-mono",
			fallbacks: ["ui-monospace", "monospace"],
			options: {
				variants: [
					{
						weight: 400,
						style: "normal",
						src: [
							"@fontsource/atkinson-hyperlegible-mono/files/atkinson-hyperlegible-mono-latin-400-normal.woff2",
						],
					},
					{
						weight: 500,
						style: "normal",
						src: [
							"@fontsource/atkinson-hyperlegible-mono/files/atkinson-hyperlegible-mono-latin-500-normal.woff2",
						],
					},
				],
			},
		},
		{
			provider: fontProviders.local(),
			name: "Jersey 15",
			cssVariable: "--font-pixel",
			fallbacks: ["monospace"],
			options: {
				variants: [
					{
						weight: 400,
						style: "normal",
						src: ["@fontsource/jersey-15/files/jersey-15-latin-400-normal.woff2"],
					},
				],
			},
		},
	],
	experimental: {
		contentIntellisense: true,
		clientPrerender: true,
	},
});
