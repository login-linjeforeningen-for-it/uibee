import { jsxs } from "react/jsx-runtime";
import Link from "next/link.js";
//#region src/components/version/version.tsx
function VersionTag({ version, url, className }) {
	if (!version) return;
	const style = `w-fit bg-login-700 text-login-100 border border-login-500/40 text-xs font-mono px-2 py-0.5 rounded ${className || ""}`;
	if (url) return /* @__PURE__ */ jsxs(Link, {
		className: style,
		target: "_blank",
		href: url,
		children: ["v", version]
	});
	return /* @__PURE__ */ jsxs("div", {
		className: style,
		children: ["v", version]
	});
}
//#endregion
export { VersionTag as default };
