"use client";
import { useEffect } from "react";
import { X } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/modal/modal.tsx
const sizes = {
	sm: "max-w-sm",
	md: "max-w-md",
	lg: "max-w-lg"
};
function Modal({ isOpen, onClose, title, children, footer, size = "md" }) {
	useEffect(() => {
		if (!isOpen) return;
		const handler = (e) => {
			if (e.key === "Escape") onClose();
		};
		document.addEventListener("keydown", handler);
		return () => document.removeEventListener("keydown", handler);
	}, [isOpen, onClose]);
	if (!isOpen) return null;
	return /* @__PURE__ */ jsxs("div", {
		role: "dialog",
		"aria-modal": "true",
		className: "fixed inset-0 z-50 flex items-center justify-center",
		onClick: onClose,
		children: [/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/50 backdrop-blur-sm" }), /* @__PURE__ */ jsxs("div", {
			className: `
                    relative z-10 mx-4 w-full ${sizes[size]}
                    flex flex-col rounded-xl border border-login-500/50
                    bg-login-800 shadow-2xl
                `,
			onClick: (e) => e.stopPropagation(),
			children: [
				title && /* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between px-6 pt-5 pb-4 border-b border-login-500/25",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "text-login-50 text-base font-semibold leading-snug",
						children: title
					}), /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: onClose,
						className: "\n                                cursor-pointer rounded-md p-1.5\n                                text-login-400 hover:text-login-100 hover:bg-login-600\n                                transition-colors\n                            ",
						children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" })
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "p-6",
					children
				}),
				footer && /* @__PURE__ */ jsx("div", {
					className: "px-6 pb-5 pt-4 border-t border-login-500/25",
					children: footer
				})
			]
		})]
	});
}
//#endregion
export { Modal as default };
