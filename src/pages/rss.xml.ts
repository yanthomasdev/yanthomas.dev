import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async (context) => {
	const articles = (await getCollection("articles"))
		.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

	return rss({
		title: "Yan Thomas",
		description: "Your friendly neighborhood open-source developer.",
		site: context.site!,
		trailingSlash: true,
		xmlns: { atom: "http://www.w3.org/2005/Atom" },
		customData: `<language>en-us</language><atom:link href="${new URL(
			"/rss.xml",
			context.site,
		)}" rel="self" type="application/rss+xml" />`,
		items: articles.map((article) => ({
			title: article.data.title,
			description: article.data.description,
			pubDate: article.data.date,
			link: `/articles/${article.id}/`,
		})),
	});
};
