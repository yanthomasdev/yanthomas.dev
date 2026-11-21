import { visit } from "unist-util-visit";

interface HastElement {
	type: string;
	tagName?: string;
	properties?: Record<string, unknown>;
	children: unknown[];
}

const isElement = (node: unknown, tag: string): node is HastElement =>
	typeof node === "object" && node !== null && (node as HastElement).type === "element"
	&& (node as HastElement).tagName === tag;

export default function rehypeTables() {
	return (tree: Parameters<typeof visit>[0]) => {
		let count = 0;

		visit(tree, "element", (node: HastElement, index, parent: HastElement | undefined) => {
			if (node.tagName !== "table" || !parent || index === undefined) return;
			const classes = parent.properties?.className;
			if (parent.type === "element" && Array.isArray(classes) && classes.includes("table")) return;

			count++;
			const caption = node.children.find((c) => isElement(c, "caption"));
			const name: Record<string, unknown> = { ariaLabel: `Table ${count}` };

			if (caption) {
				caption.properties ??= {};
				caption.properties.id ??= `table-${count}-caption`;
				name.ariaLabelledBy = caption.properties.id;
				delete name.ariaLabel;
			}

			parent.children[index] = {
				type: "element",
				tagName: "div",
				properties: { className: ["table"], tabIndex: 0, role: "region", ...name },
				children: [node],
			};
		});
	};
}
