"use client";
import MarkdownRender from "../markdownrender/markdownRender.js";
import FieldWrapper from "./shared/fieldWrapper.js";
import "./shared/index.js";
import { useState } from "react";
import { Eye, Pencil } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/inputs/textarea.tsx
function isValidJson(str) {
	try {
		JSON.parse(str);
		return null;
	} catch (error) {
		return error.message;
	}
}
function Textarea(props) {
	const { name, label, error, className, info, description, type = "text", rows = 4, textSize = "sm", ...textareaProps } = props;
	const { value } = textareaProps;
	const [preview, setPreview] = useState(false);
	const displayError = (type === "json" && value ? isValidJson(value) : void 0) || error;
	return /* @__PURE__ */ jsx(FieldWrapper, {
		label,
		name,
		required: textareaProps.required,
		info,
		description,
		error: displayError,
		textSize,
		className,
		children: /* @__PURE__ */ jsxs("div", {
			className: "relative",
			children: [
				type === "markdown" && /* @__PURE__ */ jsx("div", {
					className: "absolute right-2 top-2 z-10 flex gap-2",
					children: /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => setPreview(!preview),
						className: "p-1 rounded hover:bg-login-500/50 text-login-text transition-colors",
						title: preview ? "Edit" : "Preview",
						children: preview ? /* @__PURE__ */ jsx(Pencil, { size: 16 }) : /* @__PURE__ */ jsx(Eye, { size: 16 })
					})
				}),
				type === "markdown" && preview && /* @__PURE__ */ jsx("div", {
					className: `
                            w-full rounded-md bg-login-500/50 border border-login-500
                            p-3 overflow-y-auto ${error ? "border-red-500/70" : ""}
                        `,
					children: /* @__PURE__ */ jsx(MarkdownRender, { MDstr: String(value || "") })
				}),
				/* @__PURE__ */ jsx("textarea", {
					...textareaProps,
					id: name,
					name,
					rows,
					title: label,
					"aria-invalid": !!error,
					"aria-describedby": error ? `${name}-error` : void 0,
					className: `
                        ${type === "markdown" && preview ? "hidden" : ""}
                        w-full rounded-md bg-login-500/50 border border-login-500
                        text-login-text placeholder-login-200 text-sm
                        focus:outline-none focus:border-login/60 focus:ring-1 focus:ring-login/30
                        disabled:opacity-40 disabled:cursor-not-allowed
                        p-3 pr-10
                        transition-all duration-150
                        resize-y
                        ${error ? "border-red-500/70 focus:border-red-500/70 focus:ring-red-500/30" : ""}
                    `
				})
			]
		})
	});
}
//#endregion
export { Textarea as default };
