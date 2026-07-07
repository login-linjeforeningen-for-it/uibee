"use client";
import LogoSmall from "../logo/logoSmall.js";
import ThemeToggle from "../toggle/theme.js";
import LanguageToggle from "../toggle/language.js";
import Bubble from "./bubble.js";
import React, { useState } from "react";
import { LogOut, User } from "lucide-react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import Link from "next/link.js";
//#region src/components/navbar/navbar.tsx
function Navbar({ children, bubble, className, disableLanguageToggle, disableThemeToggle, innerClassName, lang, loginPath, logoutPath, onlyLogo, profilePath, token }) {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	return /* @__PURE__ */ jsx("div", {
		className: `${isMobileMenuOpen ? "bg-[#181818f0]" : "bg-[#18181899]"} backdrop-blur-xl fixed top-0 z-900 w-full ${className}`,
		children: /* @__PURE__ */ jsxs("div", {
			className: `flex w-full max-w-6xl m-auto p-2 transition duration-500 800px:justify-between 800px:p-4 ${isMobileMenuOpen ? "h-screen bg-login-900/20 800px:h-20" : ""} ${innerClassName}
            `,
			children: [/* @__PURE__ */ jsx("div", {
				className: "block h-12 p-1 800px:p-0",
				children: /* @__PURE__ */ jsx(Link, {
					href: "/",
					onClick: () => setIsMobileMenuOpen(false),
					children: /* @__PURE__ */ jsx(LogoSmall, {})
				})
			}), onlyLogo ? null : /* @__PURE__ */ jsxs(Fragment, { children: [
				/* @__PURE__ */ jsx("nav", {
					className: "hidden 800px:flex 800px:justify-between 800px:items-center 800px:w-fill max-w-200",
					children
				}),
				/* @__PURE__ */ jsxs("nav", {
					className: "flex w-[calc(100vw-8rem)] justify-end h-12 800px:w-fit",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "relative grid gap-2",
							children: [!disableThemeToggle && /* @__PURE__ */ jsx(ThemeToggle, {}), bubble?.theme?.condition && /* @__PURE__ */ jsx(Bubble, { bubble: bubble.theme })]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "relative grid gap-2",
							children: [!disableLanguageToggle && /* @__PURE__ */ jsx(LanguageToggle, { language: lang }), bubble?.lang?.condition && /* @__PURE__ */ jsx(Bubble, { bubble: bubble.lang })]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "relative grid gap-2",
							children: [loginPath && logoutPath && /* @__PURE__ */ jsx(AuthButton, {
								profilePath,
								token,
								loginPath,
								logoutPath
							}), bubble?.login?.condition && /* @__PURE__ */ jsx(Bubble, { bubble: bubble.login })]
						})
					]
				}),
				/* @__PURE__ */ jsxs("button", {
					className: "w-12 h-12 relative cursor-pointer bg-none border-none 800px:hidden",
					onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen),
					children: [/* @__PURE__ */ jsx("div", { className: hamburgerStyle(isMobileMenuOpen) }), /* @__PURE__ */ jsx("div", { className: hamburgerStyle(isMobileMenuOpen, true) })]
				}),
				/* @__PURE__ */ jsx("nav", {
					className: `fixed top-16 w-[calc(100%-2rem)] max-w-140 mx-auto left-0 right-0 800px:hidden
                            transition-all duration-500 ease-in-out overflow-hidden 
                            ${isMobileMenuOpen ? "max-h-[calc(100vh-4rem)] opacity-100" : "max-h-0 opacity-0"}`,
					onClick: () => setIsMobileMenuOpen(false),
					children: React.Children.map(children, (child, index) => /* @__PURE__ */ jsx("div", {
						className: `transition-all duration-500 ease-out ${isMobileMenuOpen ? "opacity-100 transform translate-y-0" : "opacity-0 transform -translate-y-4"}`,
						style: { transitionDelay: isMobileMenuOpen ? `${index * 80}ms` : "0ms" },
						children: child
					}, index))
				})
			] })]
		})
	});
}
function AuthButton({ profilePath, logoutPath, loginPath, token }) {
	return /* @__PURE__ */ jsx("div", {
		className: "rounded-[0.3rem] hover:bg-login-300/20 h-12 w-12",
		children: token ? /* @__PURE__ */ jsxs(Fragment, { children: [logoutPath && /* @__PURE__ */ jsx(Link, {
			href: logoutPath,
			prefetch: false,
			onClick: (e) => {
				e.preventDefault();
				window.location.href = logoutPath;
			},
			className: "grid items-center justify-center h-full w-full",
			children: /* @__PURE__ */ jsx(LogOut, { size: 24 })
		}), profilePath && /* @__PURE__ */ jsx(Link, {
			href: profilePath,
			className: "grid items-center justify-center h-full w-full",
			children: /* @__PURE__ */ jsx(User, { size: 24 })
		})] }) : /* @__PURE__ */ jsx(Link, {
			href: loginPath,
			className: "grid items-center justify-center h-full w-full",
			children: /* @__PURE__ */ jsx(User, { size: 24 })
		})
	});
}
function hamburgerStyle(isOpen, isSecond) {
	return `bg-login-50 h-0.5 absolute w-8 transition-all duration-[400ms] left-2 ${isOpen ? `top-6 ${isSecond ? "rotate-45" : "-rotate-45"}` : isSecond ? "top-7" : "top-4"}`;
}
//#endregion
export { Navbar as default };
