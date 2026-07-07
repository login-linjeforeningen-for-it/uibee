import { X } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/navbar/bubble.tsx
function Bubble({ bubble }) {
	if (bubble.hide) return null;
	return /* @__PURE__ */ jsxs("a", {
		href: bubble.href,
		className: `absolute top-13 min-w-40 ${bubble.className}`,
		children: [/* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 24 12",
			className: "absolute -top-3 h-3 w-6",
			"aria-hidden": "true",
			children: [/* @__PURE__ */ jsx("path", {
				d: "M12 0 24 12H0Z",
				fill: bubble.fill,
				stroke: bubble.stroke,
				strokeWidth: "1.5",
				strokeLinejoin: "round"
			}), /* @__PURE__ */ jsx("path", {
				d: "M12 0 24 12H0Z",
				fill: bubble.fill
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "flex justify-between",
			children: [/* @__PURE__ */ jsx("span", {
				className: "min-w-40",
				children: bubble.text
			}), /* @__PURE__ */ jsx(X, {
				onClick: bubble.handleHide,
				className: bubble.x
			})]
		})]
	});
}
//#endregion
export { Bubble as default };
