"use client";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/container/tabs.tsx
function Tabs({ tabs, defaultTab, activeTab: controlledTab, onTabChange, children, className = "" }) {
	const [internalTab, setInternalTab] = useState(defaultTab ?? tabs[0]?.id ?? "");
	const activeTab = controlledTab ?? internalTab;
	function handleTabChange(id) {
		if (!controlledTab) setInternalTab(id);
		onTabChange?.(id);
	}
	return /* @__PURE__ */ jsxs("div", {
		className,
		children: [/* @__PURE__ */ jsx("div", {
			className: "flex gap-1 rounded-md bg-login-500/50 border border-login-500/40 p-1 w-fit",
			children: tabs.map((tab) => /* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: () => handleTabChange(tab.id),
				className: `
                            px-3 py-1.5 rounded text-sm font-medium transition-all duration-150 cursor-pointer select-none
                            ${activeTab === tab.id ? "bg-login text-white shadow-sm" : "text-login-200 hover:text-login-50 hover:bg-login-600"}
                        `,
				children: tab.label
			}, tab.id))
		}), /* @__PURE__ */ jsx("div", {
			className: "mt-3",
			children
		})]
	});
}
function TabPanel({ id, activeTab, children }) {
	if (activeTab !== id) return null;
	return /* @__PURE__ */ jsx("div", { children });
}
//#endregion
export { TabPanel, Tabs };
