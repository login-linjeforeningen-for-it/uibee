"use client";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/code/code.tsx
function Code({ children, className = "" }) {
	return /* @__PURE__ */ jsx("code", {
		className: `font-mono text-xs bg-login-700 text-login px-1.5 py-0.5 rounded ${className}`,
		children
	});
}
function CodeBlock({ code, language, className = "" }) {
	const [copied, setCopied] = useState(false);
	function copy() {
		navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout(() => setCopied(false), 2e3);
	}
	return /* @__PURE__ */ jsxs("div", {
		className: `relative group rounded-xl border border-login-500/30 bg-login-900 overflow-hidden ${className}`,
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-center justify-between px-4 py-2 border-b border-login-500/20 bg-login-800",
			children: [/* @__PURE__ */ jsx("span", {
				className: "text-xs font-mono text-login-400",
				children: language ?? ""
			}), /* @__PURE__ */ jsxs("button", {
				type: "button",
				onClick: copy,
				className: "flex cursor-pointer items-center gap-1.5 text-xs text-login-400 hover:text-login-100 transition-colors",
				children: [copied ? /* @__PURE__ */ jsx(Check, { className: "w-3.5 h-3.5 stroke-emerald-400" }) : /* @__PURE__ */ jsx(Copy, { className: "w-3.5 h-3.5" }), copied ? "Copied" : "Copy"]
			})]
		}), /* @__PURE__ */ jsx("pre", {
			className: "overflow-x-auto p-4 text-xs font-mono leading-relaxed text-login-100",
			children: /* @__PURE__ */ jsx("code", { children: code })
		})]
	});
}
//#endregion
export { Code, CodeBlock };
