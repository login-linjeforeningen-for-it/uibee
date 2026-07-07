import { ExternalLink } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
//#region src/components/markdownrender/markdownRender.tsx
function makeDefaultComponents() {
	return {
		h1: ({ ...props }) => /* @__PURE__ */ jsx("h2", { ...props }),
		input({ type, checked }) {
			if (type !== "checkbox") return /* @__PURE__ */ jsx("input", { type });
			return /* @__PURE__ */ jsx("span", {
				"data-task-checkbox": true,
				className: `inline-flex items-center justify-center w-4 h-4 rounded-xs border-2 shrink-0 align-middle
                        ${checked ? "bg-login border-login" : "border-login/50"}`,
				children: checked && /* @__PURE__ */ jsx("svg", {
					viewBox: "0 0 10 8",
					className: "w-2.5 h-2.5 fill-none stroke-white stroke-2",
					children: /* @__PURE__ */ jsx("polyline", {
						points: "1,4 4,7 9,1",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})
				})
			});
		},
		a({ href, children }) {
			return /* @__PURE__ */ jsxs("a", {
				href,
				target: "_blank",
				rel: "noopener noreferrer",
				className: "inline-flex items-center gap-1 text-login hover:text-login/80 underline underline-offset-2 transition-colors",
				children: [children, /* @__PURE__ */ jsx(ExternalLink, { className: "w-3 h-3 shrink-0 opacity-70" })]
			});
		},
		pre({ children }) {
			return /* @__PURE__ */ jsx("pre", {
				className: "block rounded-lg overflow-auto whitespace-pre-wrap wrap-break-word w-full",
				children
			});
		}
	};
}
function MarkdownRender({ MDstr, components, className, size }) {
	return /* @__PURE__ */ jsx("div", {
		className: className ?? `prose ${size === "sm" ? "prose-sm" : size === "lg" ? "prose-lg" : size === "xl" ? "prose-xl" : ""} prose-custom max-w-none`,
		children: /* @__PURE__ */ jsx(Markdown, {
			components: {
				...makeDefaultComponents(),
				...components
			},
			remarkPlugins: [remarkGfm],
			rehypePlugins: [rehypeHighlight],
			children: MDstr.replace(/\\n/g, "\n")
		})
	});
}
//#endregion
export { MarkdownRender as default };
