import { graphql } from "@octokit/graphql";
import type { Loader, LoaderContext } from "astro/loaders";
import { z } from "astro/zod";
import { GITHUB_TOKEN } from "astro:env/server";
import sharp from "sharp";

export function contributionsLoader(login: string) {
	return {
		name: "github-contributions",
		schema: z.object({
			total: z.number(),
			days: z.array(z.object({
				date: z.string(),
				row: z.number(),
				col: z.number(),
				level: z.number(),
				count: z.number(),
			})),
		}),
		load: (context) =>
			refresh(context, "contribution calendar", async () => {
				const { user } = await query<Calendar>(
					`query($login: String!) {
						user(login: $login) {
							contributionsCollection {
								contributionCalendar {
									totalContributions
									weeks { contributionDays { date weekday contributionCount } }
								}
							}
						}
					}`,
					login,
				);

				const { totalContributions, weeks } = user.contributionsCollection.contributionCalendar;

				const max = Math.max(1, ...weeks.flatMap((w) => w.contributionDays.map((d) => d.contributionCount)));
				const days = weeks.flatMap((week, col) =>
					week.contributionDays.map((d) => ({
						date: d.date,
						row: d.weekday,
						col,
						level: Math.ceil((d.contributionCount / max) * 4),
						count: d.contributionCount,
					}))
				);

				return [{ id: "calendar", data: { total: totalContributions, days } }];
			}),
	} satisfies Loader;
}

export function sponsorsLoader(login: string) {
	return {
		name: "github-sponsors",
		schema: z.object({ login: z.string(), avatar: z.string(), order: z.number() }),
		load: (context) =>
			refresh(context, "sponsors", async () => {
				const { user } = await query<Sponsors>(
					`query($login: String!) {
						user(login: $login) {
							sponsorshipsAsMaintainer(first: 100, orderBy: { field: CREATED_AT, direction: ASC }) {
								nodes {
									sponsorEntity {
										... on User { login avatarUrl(size: 96) }
										... on Organization { login avatarUrl(size: 96) }
									}
								}
							}
						}
					}`,
					login,
				);

				const entries = [];
				for (const { sponsorEntity: s } of user.sponsorshipsAsMaintainer.nodes) {
					if (!s?.login) continue;

					const avatar = await inline(s.avatarUrl);
					if (!avatar) {
						context.logger.warn(`Skipped the sponsor ${s.login}: their avatar is gone.`);
						continue;
					}

					entries.push({ id: s.login, data: { login: s.login, avatar, order: entries.length } });
				}

				return entries;
			}),
	} satisfies Loader;
}

// The avatar host often resets connections, so avatars are fetched one at a time, retried, and inlined.
async function inline(url: string): Promise<string | null> {
	for (let attempt = 1;; attempt++) {
		try {
			const res = await fetch(url, { signal: AbortSignal.timeout(10_000) });
			if (res.status >= 400 && res.status < 500) return null;
			if (!res.ok) throw new Error(`An avatar answered ${res.status}`);

			const webp = await sharp(Buffer.from(await res.arrayBuffer()))
				.resize(48, 48, { fit: "cover", kernel: "lanczos3" })
				.flatten({ background: "#ffffff" })
				.webp({ quality: 80 })
				.toBuffer();

			return `data:image/webp;base64,${webp.toString("base64")}`;
		} catch (error) {
			if (attempt === 6) throw error;

			await new Promise((resolve) => setTimeout(resolve, 400 * attempt));
		}
	}
}

function query<T>(source: string, login: string) {
	if (!GITHUB_TOKEN) throw new Error("GITHUB_TOKEN is not set");

	return graphql<T>(source, { login, headers: { authorization: `token ${GITHUB_TOKEN}` } });
}

async function refresh(
	{ store, logger, parseData }: LoaderContext,
	what: string,
	read: () => Promise<{ id: string; data: Record<string, unknown> }[]>,
) {
	try {
		const entries = await read();

		store.clear();
		for (const { id, data } of entries) store.set({ id, data: await parseData({ id, data }) });
	} catch (error) {
		const message = `Couldn't read the GitHub ${what}: ${(error as Error).message}`;

		if (process.env["WORKERS_CI"] === "1" && store.keys().length === 0) throw new Error(message);
		logger.warn(`${message}. Keeping the last one.`);
	}
}

interface Calendar {
	user: {
		contributionsCollection: {
			contributionCalendar: {
				totalContributions: number;
				weeks: { contributionDays: { date: string; weekday: number; contributionCount: number }[] }[];
			};
		};
	};
}

interface Sponsors {
	user: {
		sponsorshipsAsMaintainer: {
			nodes: { sponsorEntity: { login?: string; avatarUrl: string } | null }[];
		};
	};
}
