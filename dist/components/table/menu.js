"use client";
import { createContext, useContext, useEffect } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { createPortal } from "react-dom";
//#region src/components/table/menu.tsx
const MenuCtx = createContext({});
function Menu({ ref, children, anchor, onClose }) {
	useEffect(() => {
		function handleKey(e) {
			if (e.key === "Escape") onClose?.();
		}
		window.addEventListener("keydown", handleKey);
		return () => window.removeEventListener("keydown", handleKey);
	}, [onClose]);
	return createPortal(/* @__PURE__ */ jsx("div", {
		ref,
		role: "menu",
		"aria-orientation": "vertical",
		style: {
			top: anchor.top,
			right: anchor.right
		},
		className: "fixed z-[9999] w-44 overflow-hidden rounded-lg border border-login-500/60 bg-login-600 shadow-xl shadow-black/40",
		children: /* @__PURE__ */ jsx(MenuCtx.Provider, {
			value: { onClose },
			children
		})
	}), document.body);
}
function MenuButton({ icon, text, hotKey, onClick, className = "" }) {
	const { onClose } = useContext(MenuCtx);
	useEffect(() => {
		if (!hotKey) return;
		function handleKey(e) {
			const tag = e.target.tagName;
			if (tag === "INPUT" || tag === "TEXTAREA") return;
			if (e.key.toLowerCase() === hotKey.toLowerCase()) {
				e.preventDefault();
				onClick();
				onClose?.();
			}
		}
		window.addEventListener("keydown", handleKey);
		return () => window.removeEventListener("keydown", handleKey);
	}, [
		hotKey,
		onClick,
		onClose
	]);
	return /* @__PURE__ */ jsxs("button", {
		role: "menuitem",
		onClick: () => {
			onClick();
			onClose?.();
		},
		className: `
                flex w-full items-center justify-between px-3 py-2 text-sm
                text-login-75 transition-colors duration-100
                hover:bg-login-500 focus:bg-login-500 focus:outline-none
                first:rounded-t-lg last:rounded-b-lg
                ${className}
            `,
		children: [/* @__PURE__ */ jsxs("span", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ jsx("span", {
				className: "h-4 w-4 shrink-0 flex items-center justify-center",
				children: icon
			}), text]
		}), hotKey && /* @__PURE__ */ jsx("kbd", {
			className: "font-mono text-xs opacity-40",
			children: hotKey
		})]
	});
}
//#endregion
export { MenuButton, Menu as default };
