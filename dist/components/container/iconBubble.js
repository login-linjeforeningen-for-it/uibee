import { jsx } from "react/jsx-runtime";
//#region src/components/container/iconBubble.tsx
const tones = {
	amber: "bg-amber-500/10 text-amber-400",
	blue: "bg-sky-500/10 text-sky-400",
	emerald: "bg-emerald-500/10 text-emerald-400",
	rose: "bg-rose-500/10 text-rose-400",
	slate: "bg-login-600 text-login-100",
	violet: "bg-violet-500/10 text-violet-400",
	orange: "bg-login/10 text-login"
};
function IconBubble({ icon: Icon, tone = "slate", size = "md" }) {
	const sizeClass = size === "sm" ? "h-7 w-7" : size === "lg" ? "h-11 w-11" : "h-9 w-9";
	const iconSize = size === "sm" ? "h-3.5 w-3.5" : size === "lg" ? "h-5 w-5" : "h-4 w-4";
	return /* @__PURE__ */ jsx("div", {
		className: `flex shrink-0 items-center justify-center rounded-lg ${sizeClass} ${tones[tone]}`,
		children: /* @__PURE__ */ jsx(Icon, { className: iconSize })
	});
}
//#endregion
export { IconBubble as default };
