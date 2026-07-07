import { useEffect, useRef, useState } from "react";
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
export { useVisibility as default };
