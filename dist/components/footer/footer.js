import VersionTag from "../version/version.js";
import { jsx, jsxs } from "react/jsx-runtime";
import Link from "next/link.js";
//#region src/components/footer/footer.tsx
function t(s, lang) {
	return typeof s === "string" ? s : s[lang];
}
function Column({ col, lang }) {
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
		className: "pb-2 text-sm font-medium tracking-widest text-login-100",
		children: t(col.heading, lang)
	}), col.items.map((item, j) => item.href ? item.href.startsWith("/") ? /* @__PURE__ */ jsx(Link, {
		className: "link--underscore-hover block text-login-50",
		href: item.href,
		children: t(item.label, lang)
	}, j) : /* @__PURE__ */ jsx("a", {
		className: "link--underscore-hover block text-login-50",
		href: item.href,
		children: t(item.label, lang)
	}, j) : /* @__PURE__ */ jsx("p", {
		className: "text-login-50",
		children: t(item.label, lang)
	}, j))] });
}
function Footer({ logo, sponsor, columns, socialLinks, copyright, version, lang = "no", className }) {
	const year = (/* @__PURE__ */ new Date()).getFullYear();
	const [firstColumn, ...restColumns] = columns ?? [];
	const hasRight = columns && columns.length > 0 || socialLinks && socialLinks.length > 0;
	return /* @__PURE__ */ jsx("div", {
		className: `max-md:mt-24 bg-login-950 md:mt-40 ${className || ""}`,
		children: /* @__PURE__ */ jsxs("div", {
			className: `
                mx-auto w-full pb-4 max-md:px-4 max-md:pt-16 md:max-w-304 md:px-12 md:pt-20
                ${hasRight ? "md:grid md:grid-cols-[18rem_1fr] md:gap-x-12" : ""}
            `,
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "mx-auto grid w-full max-md:max-w-60 max-md:gap-16 md:row-span-2 md:max-w-72 md:gap-20",
					children: [/* @__PURE__ */ jsx("div", {
						className: "block w-full",
						children: logo
					}), sponsor && /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
						className: "block w-full",
						children: sponsor.node
					}), sponsor.label && /* @__PURE__ */ jsx("p", {
						className: "pt-8 text-center text-login-100",
						children: t(sponsor.label, lang)
					})] })]
				}),
				firstColumn && /* @__PURE__ */ jsx("div", {
					className: "\n                        grid w-full self-start max-md:mt-16\n                        max-sm:max-w-60 sm:max-md:max-w-88\n                        md:col-start-2 md:row-start-1 md:max-w-136 md:justify-self-center\n                    ",
					children: /* @__PURE__ */ jsx(Column, {
						col: firstColumn,
						lang
					})
				}),
				restColumns.length > 0 && /* @__PURE__ */ jsx("div", {
					className: `
                        grid w-full self-start max-md:mt-16 max-md:gap-8
                        max-sm:max-w-60 sm:max-md:max-w-88 sm:justify-items-end sm:justify-self-end
                        md:col-start-2 md:row-start-1 md:max-w-136 md:justify-self-end
                        ${restColumns.length > 1 ? "sm:grid-cols-2" : ""}
                    `,
					children: restColumns.map((col, i) => /* @__PURE__ */ jsx("div", {
						className: "sm:justify-self-center md:justify-self-end",
						children: /* @__PURE__ */ jsx(Column, {
							col,
							lang
						})
					}, i))
				}),
				socialLinks && socialLinks.length > 0 && /* @__PURE__ */ jsx("div", {
					className: "md:col-start-2 md:row-start-2 md:justify-self-end",
					children: /* @__PURE__ */ jsx("div", {
						className: "mx-auto mt-20 mb-12 grid w-fit gap-6 max-sm:grid-cols-3 sm:grid-flow-col",
						children: socialLinks.map((link, i) => /* @__PURE__ */ jsx("a", {
							className: `group mx-auto flex h-8 w-8 items-center justify-center
                                        text-login-100 transition-all duration-200
                                        ${link.hoverClass ?? "hover:text-login-50"}`,
							title: link.title,
							href: link.href,
							target: "_blank",
							rel: "noreferrer",
							children: link.icon
						}, i))
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-24 grid grid-cols-[auto_min-content] items-end gap-8 md:col-span-2 md:row-start-3",
					children: [/* @__PURE__ */ jsxs("p", {
						className: "text-xs wrap-break-word text-login-100",
						children: [
							lang === "no" ? "Opphavsrett" : "Copyright",
							" © ",
							year,
							" ",
							t(copyright, lang)
						]
					}), version && /* @__PURE__ */ jsx(VersionTag, {
						version: version.tag,
						url: version.href
					})]
				})
			]
		})
	});
}
//#endregion
export { Footer as default };
