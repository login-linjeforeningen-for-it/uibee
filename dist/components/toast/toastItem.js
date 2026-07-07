"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/toast/toastItem.tsx
function ToastItem({ toast, index, expanded, onRemove, onHeight, offset, frontHeight }) {
	const [mounted, setMounted] = useState(false);
	const ref = useRef(null);
	useEffect(() => {
		requestAnimationFrame(() => setMounted(true));
	}, []);
	useLayoutEffect(() => {
		if (ref.current) onHeight(toast.id, ref.current.offsetHeight);
	}, [
		toast.message,
		onHeight,
		toast.id,
		expanded
	]);
	const isVisible = mounted && !toast.exiting;
	const isFront = index === 0;
	const collapsedOffset = index * 10 + (index > 0 ? frontHeight - 60 : 0);
	return /* @__PURE__ */ jsx("li", {
		ref,
		className: "absolute bottom-0 right-0 w-full transition-all duration-300 ease-out pointer-events-auto",
		style: {
			transform: isVisible ? `translateY(${expanded ? -offset : -collapsedOffset}px) scale(${expanded ? 1 : 1 - index * .05})` : "translateY(20px) scale(0.9)",
			opacity: isVisible ? 1 : 0,
			zIndex: toast.id
		},
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex items-center space-x-4 rounded-lg p-4 shadow-lg border-2 border-login-400 bg-login-700",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "shrink-0",
					children: Icon(toast.type)
				}),
				/* @__PURE__ */ jsx("p", {
					className: `flex-1 text-sm font-semibold text-login-800 dark:text-login-100 min-w-0
                        ${!expanded && !isFront ? "truncate" : ""}`,
					children: toast.message
				}),
				/* @__PURE__ */ jsx("button", {
					onClick: onRemove,
					className: "hover:text-login-200 text-login-400",
					children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5" })
				})
			]
		})
	});
}
function Icon(type) {
	switch (type) {
		case "info": return /* @__PURE__ */ jsx(Info, { className: "h-6 w-6 text-blue-500" });
		case "success": return /* @__PURE__ */ jsx(CheckCircle, { className: "h-6 w-6 text-green-500" });
		case "warning": return /* @__PURE__ */ jsx(AlertTriangle, { className: "h-6 w-6 text-yellow-500" });
		case "error": return /* @__PURE__ */ jsx(AlertCircle, { className: "h-6 w-6 text-red-500" });
	}
}
//#endregion
export { ToastItem as default };
