"use client";
import { TriangleAlert } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/confirm/confirmPopup.tsx
function ConfirmPopup({ isOpen, header, description, confirmText = "Confirm", cancelText = "Cancel", onConfirm, onCancel, variant = "default" }) {
	if (!isOpen) return null;
	return /* @__PURE__ */ jsxs("div", {
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": "confirm-popup-header",
		className: "fixed inset-0 z-50 flex items-center justify-center",
		onClick: onCancel,
		children: [/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/50 backdrop-blur-sm" }), /* @__PURE__ */ jsxs("div", {
			className: "\n                    relative z-10 w-full max-w-md mx-4\n                    bg-login-800 border border-login-500/50 rounded-xl\n                    shadow-2xl p-6 flex flex-col gap-4\n                ",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-start gap-3",
					children: [variant !== "default" && /* @__PURE__ */ jsx(TriangleAlert, { className: `w-5 h-5 shrink-0 mt-0.5 ${variant === "danger" ? "stroke-red-400" : "stroke-yellow-400"}` }), /* @__PURE__ */ jsx("h2", {
						id: "confirm-popup-header",
						className: "text-login-50 text-base font-semibold leading-snug",
						children: header
					})]
				}),
				description && /* @__PURE__ */ jsx("p", {
					className: "text-login-200 text-sm leading-relaxed",
					children: description
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex justify-end gap-2 mt-1",
					children: [/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: onCancel,
						className: "\n                            cursor-pointer px-4 py-1.5 rounded-md text-sm font-medium\n                            bg-login-600 hover:bg-login-500 text-login-100\n                            transition-colors duration-150 select-none\n                        ",
						children: cancelText
					}), /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: onConfirm,
						className: `
                            cursor-pointer px-4 py-1.5 rounded-md text-sm font-medium
                            transition-all duration-150 select-none
                            ${variant === "danger" ? "bg-red-600 hover:brightness-110 text-white" : variant === "warning" ? "bg-yellow-500 hover:brightness-110 text-black" : "bg-login hover:brightness-110 text-white"}
                        `,
						children: confirmText
					})]
				})
			]
		})]
	});
}
//#endregion
export { ConfirmPopup as default };
