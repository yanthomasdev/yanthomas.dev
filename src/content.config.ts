import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const articles = defineCollection({
	loader: glob({ pattern: ["*.md", "*.mdx"], base: "src/articles" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.coerce.date(),
	}),
});

export const collections = { articles };
