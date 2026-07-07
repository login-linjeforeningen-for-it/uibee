"use client";
import { useRef, useState } from "react";
import { FileIcon, UploadCloud, X } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/inputs/fileInput.tsx
function FileInput({ name, label, accept, multiple = false, onChange, className = "" }) {
	const [files, setFiles] = useState([]);
	const [dragging, setDragging] = useState(false);
	const inputRef = useRef(null);
	function handleFiles(incoming) {
		if (!incoming) return;
		const arr = multiple ? Array.from(incoming) : [incoming[0]];
		setFiles(arr);
		onChange(arr);
	}
	function removeFile(index) {
		const next = files.filter((_, i) => i !== index);
		setFiles(next);
		onChange(next);
		if (inputRef.current) inputRef.current.value = "";
	}
	function onDrop(e) {
		e.preventDefault();
		setDragging(false);
		handleFiles(e.dataTransfer.files);
	}
	return /* @__PURE__ */ jsxs("div", {
		className: `flex flex-col gap-2 ${className}`,
		children: [
			label && /* @__PURE__ */ jsx("label", {
				className: "text-sm font-medium text-login-200",
				children: label
			}),
			/* @__PURE__ */ jsxs("div", {
				role: "button",
				tabIndex: 0,
				onClick: () => inputRef.current?.click(),
				onKeyDown: (e) => {
					if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
				},
				onDragOver: (e) => {
					e.preventDefault();
					setDragging(true);
				},
				onDragLeave: () => setDragging(false),
				onDrop,
				className: `
                    flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6
                    transition-all duration-150
                    ${dragging ? "scale-[1.01] border-login bg-login/5" : "border-login-500/50 bg-login-800/30 hover:border-login/50 hover:bg-login/5"}
                `,
				children: [
					/* @__PURE__ */ jsx("input", {
						ref: inputRef,
						type: "file",
						name,
						accept,
						multiple,
						className: "hidden",
						onChange: (e) => handleFiles(e.target.files)
					}),
					/* @__PURE__ */ jsx(UploadCloud, { className: "h-7 w-7 text-login-400" }),
					/* @__PURE__ */ jsxs("div", {
						className: "text-center",
						children: [/* @__PURE__ */ jsxs("p", {
							className: "text-sm text-login-200",
							children: ["Drop files here or ", /* @__PURE__ */ jsx("span", {
								className: "text-login",
								children: "browse"
							})]
						}), accept && /* @__PURE__ */ jsx("p", {
							className: "mt-0.5 text-xs text-login-400",
							children: accept
						})]
					})
				]
			}),
			files.length > 0 && /* @__PURE__ */ jsx("ul", {
				className: "flex flex-col gap-1.5",
				children: files.map((file, i) => /* @__PURE__ */ jsxs("li", {
					className: "\n                            flex items-center gap-2 rounded-lg\n                            border border-login-500/25 bg-login-800/50 px-3 py-2 text-sm\n                        ",
					children: [
						/* @__PURE__ */ jsx(FileIcon, { className: "h-4 w-4 shrink-0 text-login-400" }),
						/* @__PURE__ */ jsx("span", {
							className: "flex-1 truncate text-login-200",
							children: file.name
						}),
						/* @__PURE__ */ jsxs("span", {
							className: "shrink-0 text-xs text-login-400",
							children: [(file.size / 1024).toFixed(1), " KB"]
						}),
						/* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: (e) => {
								e.stopPropagation();
								removeFile(i);
							},
							className: "cursor-pointer text-login-400 transition-colors hover:text-red-400",
							children: /* @__PURE__ */ jsx(X, { className: "h-3.5 w-3.5" })
						})
					]
				}, i))
			})
		]
	});
}
//#endregion
export { FileInput as default };
