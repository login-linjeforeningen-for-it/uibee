import Card from "./card.js";
import IconBubble from "./iconBubble.js";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/container/statCard.tsx
function StatCard({ label, value, icon, tone = "slate" }) {
	return /* @__PURE__ */ jsxs(Card, {
		className: "p-4",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "mb-3 flex items-center gap-3",
			children: [/* @__PURE__ */ jsx(IconBubble, {
				icon,
				tone
			}), /* @__PURE__ */ jsx("span", {
				className: "text-sm font-medium text-login-200",
				children: label
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "truncate text-lg font-semibold text-login-50",
			title: value,
			children: value
		})]
	});
}
//#endregion
export { StatCard as default };
