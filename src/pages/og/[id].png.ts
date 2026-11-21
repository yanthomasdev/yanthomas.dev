import type { APIRoute } from "astro";
import { getCollection, getEntry } from "astro:content";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { join } from "node:path";
import { satoriAstroOG } from "satori-astro";
import { html } from "satori-html";

const require = createRequire(import.meta.url);

const fonts = await Promise.all(
	([
		["Atkinson Hyperlegible Mono", 400, "atkinson-hyperlegible-mono"],
		["Atkinson Hyperlegible Mono", 500, "atkinson-hyperlegible-mono"],
		["Atkinson Hyperlegible Next", 400, "atkinson-hyperlegible-next"],
		["Jersey 15", 400, "jersey-15"],
	] as const).map(async ([name, weight, pkg]) => ({
		name,
		weight,
		style: "normal" as const,
		data: await readFile(require.resolve(`@fontsource/${pkg}/files/${pkg}-latin-${weight}-normal.woff`)),
	})),
);

const C = { bg: "#0A0A0A", fg: "#EDEDED", dim: "#8F8F8F", faint: "#2E2E2E", acc: "#6FB7D1" };
const LEVELS = ["#16232A", "#1F4656", "#2F6F87", "#4E9AB6", "#8FD0E6"];

const svgUri = (svg: string) => `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
const fileUri = async (path: string) => svgUri(await readFile(join(process.cwd(), path), "utf-8"));

const sprite = await fileUri("public/sprite.svg");
const spriteGray = await fileUri("public/sprite-gray.svg");

const STEPS = [
	[[0, 0], [8, 0], [4, 4], [12, 4], [0, 8], [8, 8], [4, 12], [12, 12]],
	[[0, 0], [8, 0], [4, 8], [12, 8]],
	[[0, 0], [8, 8]],
];

const rects: string[] = [];
STEPS.forEach((cells, s) => {
	for (let tx = 0; tx < 96; tx += 16) {
		for (let ty = 0; ty < 48; ty += 16) {
			for (const [x, y] of cells) {
				rects.push(`<rect x="${s * 96 + tx + x!}" y="${ty + y!}" width="4" height="4"/>`);
			}
		}
	}
});

const dither = svgUri(
	`<svg xmlns="http://www.w3.org/2000/svg" width="288" height="48" shape-rendering="crispEdges" fill="${C.acc}">${
		rects.join("")
	}</svg>`,
);

const escape = (text: string) =>
	text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const frame = (inner: string) => `
	<div style="display: flex; position: relative; width: 1200px; height: 630px; background-color: ${C.bg}; color: ${C.fg}; font-family: 'Atkinson Hyperlegible Mono';">
		${inner}
		<div style="display: flex; position: absolute; left: 0; right: 0; bottom: 0; height: 48px;">
			<div style="display: flex; width: 456px; height: 48px; background-color: ${C.acc};"></div>
			<img src="${dither}" style="width: 288px; height: 48px;" />
		</div>
	</div>`;

type Props =
	| { kind: "article"; title: string; meta: string; description: string }
	| { kind: "home"; total: number | null; graph: string | null }
	| { kind: "notfound" };

const TITLE_WIDTH = 608;

function titleLines(title: string, size: number) {
	const perLine = Math.floor(TITLE_WIDTH / (size * 0.4));
	let lines = 1, used = 0;

	for (const word of title.split(/\s+/)) {
		const need = used ? used + 1 + word.length : word.length;
		if (need > perLine && used) {
			lines++;
			used = word.length;
		} else used = need;
	}

	return lines;
}

function clip(text: string, max = 150) {
	if (text.length <= max) return text;

	const cut = text.slice(0, max);
	return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:.\s]+$/, "")}…`;
}

function article({ title, meta, description }: { title: string; meta: string; description: string }) {
	const size = titleLines(title, 60) <= 3 ? 60 : 45;

	return frame(`
		<img src="${sprite}" style="position: absolute; left: 72px; top: 99px; width: 384px; height: 384px;" />
		<div style="display: flex; flex-direction: column; justify-content: center; position: absolute; left: 520px; width: ${TITLE_WIDTH}px; top: 99px; height: 384px;">
			<span style="font-size: 22px; line-height: 28px; color: ${C.dim}; white-space: pre;">${escape(meta)}</span>
			<h1 style="margin: 16px 0 0; font-family: 'Jersey 15'; font-weight: 400; font-size: ${size}px; line-height: 0.95; text-wrap: balance;">${
				escape(title)
			}</h1>
			<p style="margin: 24px 0 0; font-family: 'Atkinson Hyperlegible Next'; font-size: 24px; line-height: 1.4; color: ${C.dim};">${
				escape(clip(description))
			}</p>
		</div>`);
}

function card(image: string, text: string, center = false, size = 336) {
	return frame(`
		<div style="display: flex; align-items: center;${
			center ? " justify-content: center; left: 0; right: 0;" : " left: 72px; right: 72px;"
		} position: absolute; top: 0; bottom: 48px;">
			<div style="display: flex; height: ${size}px;">
				<img src="${image}" style="width: ${size}px; height: ${size}px;" />
				<div style="display: flex; flex-direction: column; justify-content: space-between; height: ${size}px; margin-left: 48px;">${text}</div>
			</div>
		</div>`);
}

function home({ total, graph }: { total: number | null; graph: string | null }) {
	const name =
		`<div style="display: flex; flex-direction: column; margin-top: -8px; font-family: 'Jersey 15'; font-size: 150px; line-height: 100px;">
			<span>YAN</span>
			<span>THOMAS</span>
		</div>`;

	const below = graph && total !== null
		? `<div style="display: flex; flex-direction: column; margin-bottom: -3px;">
				<img src="${graph}" style="width: 530px; height: 70px;" />
				<span style="margin-top: 12px; font-size: 22px; line-height: 28px; color: ${C.dim};">${
					total.toLocaleString("en-US")
				} contributions this year</span>
			</div>`
		: "";

	return card(sprite, name + below);
}

const NOT_FOUND = 288;

function notFound() {
	return card(
		spriteGray,
		`<span style="display: flex; align-items: center; height: ${NOT_FOUND}px; font-family: 'Jersey 15'; font-size: 432px; line-height: ${NOT_FOUND}px;">404</span>`,
		true,
		NOT_FOUND,
	);
}

async function graphImage(): Promise<{ total: number | null; graph: string | null }> {
	const data = (await getEntry("contributions", "calendar"))?.data;
	if (!data) return { total: null, graph: null };

	const cells = data.days.map((d) =>
		`<rect x="${d.col * 10}" y="${d.row * 10}" width="8" height="8" fill="${LEVELS[d.level]}"/>`
	).join("");

	return {
		total: data.total,
		graph: svgUri(
			`<svg xmlns="http://www.w3.org/2000/svg" width="530" height="70" shape-rendering="crispEdges">${cells}</svg>`,
		),
	};
}

export async function getStaticPaths() {
	const articles = await getCollection("articles");

	const pages: [string, Props][] = [
		["home", { kind: "home", ...(await graphImage()) }],
		["404", { kind: "notfound" }],
	];

	return [
		...pages.map(([id, props]) => ({ params: { id }, props })),
		...articles.map((a) => ({
			params: { id: a.id },
			props: {
				kind: "article",
				title: a.data.title,
				meta: `${a.data.date.toISOString().slice(0, 10)}   ${
					Math.max(1, Math.round((a.body ?? "").trim().split(/\s+/).length / 230))
				} min read`,
				description: a.data.description,
			} as Props,
		})),
	];
}

export const GET: APIRoute = async ({ props }) => {
	const p = props as Props;
	const markup = p.kind === "home"
		? home(p)
		: p.kind === "notfound"
		? notFound()
		: article(p);

	return await satoriAstroOG({
		template: html(Object.assign([markup], { raw: [markup] }) as unknown as TemplateStringsArray),
		width: 1200,
		height: 630,
	}).toResponse({
		satori: { fonts },
		response: {
			headers: { "Content-Type": "image/png" },
		},
	});
};
