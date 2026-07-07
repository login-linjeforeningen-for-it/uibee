"use client";
import Input from "./input.js";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
import { usePathname, useRouter, useSearchParams } from "next/navigation.js";
//#region src/components/inputs/searchInput.tsx
function SearchInput({ placeholder = "Search...", variant = "default" }) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [searchValue, setSearchValue] = useState(searchParams.get("q") || "");
	useEffect(() => {
		setSearchValue(searchParams.get("q") || "");
	}, [searchParams]);
	function handleSearch(value) {
		setSearchValue(value);
		const params = new URLSearchParams(searchParams.toString());
		if (value.trim()) params.set("q", value.trim());
		else params.delete("q");
		params.delete("page");
		router.push(`${pathname}?${params.toString()}`);
	}
	function handleKeyDown(e) {
		if (e.key === "Enter") handleSearch(searchValue);
	}
	function handleChange(e) {
		setSearchValue(e.target.value);
	}
	if (variant === "minimal") return /* @__PURE__ */ jsxs("div", {
		className: "relative",
		children: [/* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" }), /* @__PURE__ */ jsx("input", {
			type: "text",
			value: searchValue,
			onChange: (e) => setSearchValue(e.target.value),
			onKeyDown: handleKeyDown,
			onBlur: () => handleSearch(searchValue),
			placeholder,
			className: "pl-10 pr-4 py-2 border-b outline-none w-64"
		})]
	});
	else return /* @__PURE__ */ jsx("div", {
		className: "w-fit min-w-48",
		children: /* @__PURE__ */ jsx(Input, {
			name: "search",
			icon: /* @__PURE__ */ jsx(Search, { className: "w-5 h-5" }),
			value: searchValue,
			onChange: handleChange,
			onKeyDown: handleKeyDown,
			onBlur: () => handleSearch(searchValue),
			placeholder
		})
	});
}
//#endregion
export { SearchInput as default };
