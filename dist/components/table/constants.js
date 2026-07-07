//#region src/components/table/constants.ts
const HIGHLIGHT = {
	green: "bg-green-500/15  text-green-400  ring-1 ring-green-500/25",
	yellow: "bg-yellow-500/15 text-yellow-400 ring-1 ring-yellow-500/25",
	red: "bg-red-500/15    text-red-400    ring-1 ring-red-500/25",
	blue: "bg-blue-500/15   text-blue-400   ring-1 ring-blue-500/25",
	gray: "bg-gray-500/15   text-gray-400   ring-1 ring-gray-500/25",
	orange: "bg-orange-500/15 text-orange-400 ring-1 ring-orange-500/25",
	purple: "bg-purple-500/15 text-purple-400 ring-1 ring-purple-500/25"
};
const DENSITY_TH = {
	compact: "px-4 py-2",
	comfortable: "px-6 py-3",
	spacious: "px-8 py-4"
};
const DENSITY_TD = {
	compact: "px-4 py-1.5",
	comfortable: "px-6 py-3.5",
	spacious: "px-8 py-5"
};
const VARIANT_CONTAINER = {
	original: "bg-login-500/50 rounded-lg border border-login-600 shadow",
	modern: "bg-transparent"
};
const VARIANT_THEAD = {
	original: "bg-login-700",
	modern: "bg-transparent"
};
const VARIANT_HEAD_BG = {
	original: "bg-login-700",
	modern: ""
};
const VARIANT_HEAD_BORDER = {
	original: "border-b border-login-600",
	modern: "border-b border-login-500/40"
};
const VARIANT_ROW_BORDER = {
	original: "border-b border-login-600",
	modern: "border-b border-login-600/15"
};
const VARIANT_THEAD_TH = {
	original: "text-login-200",
	modern: "text-login-300"
};
const VARIANT_TBODY = {
	original: "bg-login-500/50 divide-login-600",
	modern: "divide-login-600/15"
};
const VARIANT_ROW_HOVER = {
	original: "hover:bg-login-600/30",
	modern: "hover:bg-login-700/50"
};
const VARIANT_ROW_STRIPED = {
	original: "even:bg-login-600/40",
	modern: "even:bg-login-800/40"
};
//#endregion
export { DENSITY_TD, DENSITY_TH, HIGHLIGHT, VARIANT_CONTAINER, VARIANT_HEAD_BG, VARIANT_HEAD_BORDER, VARIANT_ROW_BORDER, VARIANT_ROW_HOVER, VARIANT_ROW_STRIPED, VARIANT_TBODY, VARIANT_THEAD, VARIANT_THEAD_TH };
