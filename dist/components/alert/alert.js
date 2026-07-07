import LeftBarPanel from "../container/leftBarPanel.js";
import { CircleAlert, Info } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/alert/alert.tsx
const styles = {
	warning: {
		color: "border-l-red-500",
		iconClass: "w-4 h-4 shrink-0 stroke-red-400 mr-3 mt-0.5",
		Icon: CircleAlert
	},
	info: {
		color: "border-l-blue-500",
		iconClass: "w-4 h-4 shrink-0 stroke-blue-400 mr-3 mt-0.5",
		Icon: Info
	}
};
function Alert({ children, variant = "warning", className = "" }) {
	const { color, iconClass, Icon } = styles[variant] ?? styles.warning;
	return /* @__PURE__ */ jsxs(LeftBarPanel, {
		color,
		className: `flex items-start px-4 py-3 text-sm text-login-100 ${className}`,
		children: [/* @__PURE__ */ jsx(Icon, { className: iconClass }), /* @__PURE__ */ jsx("div", {
			className: "leading-relaxed",
			children
		})]
	});
}
//#endregion
export { Alert as default };
