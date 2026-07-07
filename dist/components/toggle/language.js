"use client";
import { useEffect, useState } from "react";
import { Globe } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useRouter } from "next/navigation.js";
import { getCookie, setCookie } from "utilbee";
//#region src/components/toggle/language.tsx
function LanguageToggle({ language }) {
	const [lang, setLang] = useState(language || "en");
	const [jump, setJump] = useState(false);
	const router = useRouter();
	useEffect(() => {
		const savedLang = getCookie("lang");
		if (savedLang) setLang(savedLang);
	}, []);
	function handleClick() {
		const newLang = lang === "no" ? "en" : "no";
		setCookie("lang", newLang);
		setLang(newLang);
		language = newLang;
		setJump(true);
		setTimeout(() => setJump(false), 400);
		router.refresh();
	}
	return /* @__PURE__ */ jsxs("button", {
		value: lang,
		onClick: handleClick,
		className: `cursor-pointer p-2 leading-8 text-base w-[4.3rem] text-center rounded 
        bg-transparent border-none hover:bg-gray-400/10 flex flex-row items-center justify-center gap-1`,
		children: [/* @__PURE__ */ jsx(Globe, { className: `text-xl leading-8 -mt-0.5 ${jump ? "animate-jump" : ""}` }), " " + lang]
	});
}
//#endregion
export { LanguageToggle as default };
