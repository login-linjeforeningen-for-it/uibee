import Logo from "../logo/logo.js";
import { LogIn } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
import Link from "next/link.js";
//#region src/components/login/loginPage.tsx
function LoginPage({ title, description, redirectPath, version, btg, handleSubmit, guestRedirectPath, guestText }) {
	return /* @__PURE__ */ jsx("main", {
		className: "w-full h-full flex items-center justify-center bg-login-800 p-8",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex flex-col justify-center items-center bg-login-600 px-4 py-12 rounded-xl w-full max-w-md gap-4 md:gap-6",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "relative aspect-3/1 w-full",
					children: /* @__PURE__ */ jsx(Logo, { className: "object-contain px-6 sm:px-12" })
				}),
				/* @__PURE__ */ jsxs("h1", {
					className: "text-3xl font-extrabold text-login text-center tracking-tight",
					children: [
						title,
						" ",
						btg ? " - Break the Glass" : ""
					]
				}),
				description && /* @__PURE__ */ jsx("p", {
					className: "text-center font-medium text-lg mb-2 max-w-xs",
					children: description
				}),
				btg ? /* @__PURE__ */ jsxs("form", {
					className: "w-full flex flex-col gap-3 max-w-xs",
					onSubmit: (e) => {
						e.preventDefault();
						handleSubmit?.(new FormData(e.currentTarget));
						e.currentTarget.reset();
					},
					children: [
						/* @__PURE__ */ jsx("input", {
							type: "text",
							name: "name",
							placeholder: "Name",
							className: "py-2 px-3 rounded bg-login-900 font-medium focus:outline-none",
							required: true
						}),
						/* @__PURE__ */ jsx("input", {
							type: "password",
							name: "token",
							placeholder: "Token",
							className: "py-2 px-3 rounded bg-login-900 font-medium focus:outline-none",
							required: true
						}),
						/* @__PURE__ */ jsx("button", {
							type: "submit",
							className: "py-2 px-4 rounded-xl bg-login font-bold text-lg hover:bg-login/80 transition-all duration-200 mt-2",
							children: "Login"
						})
					]
				}) : /* @__PURE__ */ jsxs(Link, {
					href: redirectPath,
					className: `
                            flex items-center justify-center gap-2 w-full
                            max-w-xs py-3 px-6 rounded-xl bg-login font-bold
                            text-lg hover:bg-login/80 transition-all
                            duration-200 mb-2 mt-2 cursor-pointer
                        `,
					children: ["Login", /* @__PURE__ */ jsx(LogIn, { className: "w-6 h-6" })]
				}),
				guestRedirectPath && /* @__PURE__ */ jsx(Link, {
					href: guestRedirectPath,
					className: "text-sm font-semibold cursor-pointer opacity-50",
					children: guestText || "Continue as guest"
				}),
				/* @__PURE__ */ jsxs("span", {
					className: "text-sm mt-2",
					children: ["v", version]
				})
			]
		})
	});
}
//#endregion
export { LoginPage as default };
