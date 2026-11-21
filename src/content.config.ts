import { contributionsLoader, sponsorsLoader } from "#loaders/github.ts";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

const articles = defineCollection({
	loader: glob({ pattern: ["*.md", "*.mdx"], base: "src/articles" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.coerce.date(),
	}),
});

const sponsors = defineCollection({ loader: sponsorsLoader("yanthomasdev") });

const contributions = defineCollection({ loader: contributionsLoader("yanthomasdev") });

export const collections = { articles, sponsors, contributions };
