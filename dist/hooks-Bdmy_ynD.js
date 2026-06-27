'use client';
import { useEffect, useRef, useState } from "react";
//#region src/hooks/useClickOutside.ts
function useClickOutside(refOrCallback, maybeCallback) {
	let ref;
	let callback;
	if (typeof refOrCallback === "function") {
		ref = useRef(null);
		callback = refOrCallback;
	} else {
		ref = refOrCallback;
		callback = maybeCallback;
	}
	useEffect(() => {
		function handleClickOutside(event) {
			if (ref && ref.current && !ref.current.contains(event.target)) callback();
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref, callback]);
	if (typeof refOrCallback === "function") return ref;
}
//#endregion
//#region src/hooks/useVisibility.ts
function useVisibility(onVisible, rootMargin = "200px") {
	const [isVisible, setIsVisible] = useState(false);
	const ref = useRef(null);
	useEffect(() => {
		if (typeof window === "undefined") return;
		if (!("ontouchstart" in window || navigator.maxTouchPoints > 0)) return;
		const observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				setIsVisible(true);
				onVisible();
				observer.disconnect();
			}
		}, { rootMargin });
		if (ref.current) observer.observe(ref.current);
		return () => observer.disconnect();
	}, [onVisible, rootMargin]);
	return {
		ref,
		isVisible
	};
}
//#endregion
//#region src/hooks/useDarkMode.ts
function useDarkMode() {
	const [isDark, setIsDark] = useState(false);
	useEffect(() => {
		setIsDark(document.documentElement.classList.contains("dark"));
		const observer = new MutationObserver(() => {
			setIsDark(document.documentElement.classList.contains("dark"));
		});
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"]
		});
		return () => observer.disconnect();
	}, []);
	return isDark;
}
//#endregion
export { useVisibility as n, useClickOutside as r, useDarkMode as t };
