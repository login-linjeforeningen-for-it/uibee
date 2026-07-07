import { CircleHelp } from "lucide-react";
import { jsx } from "react/jsx-runtime";
//#region src/components/inputs/shared/inputInfo.tsx
function InputInfo({ info }) {
	return /* @__PURE__ */ jsx("div", {
		className: "text-login-200 hover:text-login-text transition-colors",
		"aria-label": info,
		title: info,
		children: /* @__PURE__ */ jsx(CircleHelp, { className: "w-4 h-4" })
	});
}
//#endregion
export { InputInfo as default };
