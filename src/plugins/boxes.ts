import { visit } from "unist-util-visit";

export default function remarkBoxes() {
	return (tree: Parameters<typeof visit>[0]) => {
		let count = 0;

		visit(tree, "containerDirective", (node: Directive) => {
			const kind = KINDS[node.name];
			if (!kind) return;

			const id = `box-${++count}`;
			const children = [...node.children];

			let title: MdNode[] | null = null;
			if (children[0]?.data?.directiveLabel) {
				title = children.shift()!.children ?? [];

				// remark-directive keeps any space before the label's closing bracket
				const last = title.at(-1);
				if (last?.type === "text" && last.value) last.value = last.value.trimEnd();
			} else if (node.attributes?.title) {
				title = [{ type: "text", value: node.attributes.title }];
			}

			const label: MdNode[] = title
				? [el("span", { className: ["sr-only"] }, [{ type: "text", value: `${kind}: ` }]), ...title]
				: [{ type: "text", value: kind }];

			node.data = {
				hName: "div",
				hProperties: { className: ["box", `box--${node.name}`], role: "note", ariaLabelledby: id },
			};

			node.children = [
				el("div", { className: ["box-bar"] }, [
					el("span", { className: ["box-label"], id, ariaHidden: "true" }, label),
					el("i", { ariaHidden: "true" }, []),
					el("i", { ariaHidden: "true" }, []),
					el("i", { ariaHidden: "true" }, []),
				]),
				el("div", { className: ["box-body"] }, children),
			];
		});
	};
}

interface MdNode {
	type: string;
	value?: string;
	children?: MdNode[];
	data?: { directiveLabel?: boolean; hName?: string; hProperties?: Record<string, unknown> };
}
interface Directive extends MdNode {
	name: string;
	attributes?: { title?: string };
	children: MdNode[];
}

const KINDS: Record<string, string> = { note: "Note", tip: "Tip", caution: "Caution", danger: "Danger" };

function el(tagName: string, properties: Record<string, unknown>, children: MdNode[]): MdNode {
	return { type: "paragraph", data: { hName: tagName, hProperties: properties }, children };
}
