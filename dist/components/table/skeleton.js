import { DENSITY_TD, VARIANT_ROW_BORDER, VARIANT_TBODY } from "./constants.js";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/table/skeleton.tsx
function Skeleton({ columns, rows, variant, density, hasMenu, hasSelect }) {
	return /* @__PURE__ */ jsx("tbody", {
		className: VARIANT_TBODY[variant],
		children: Array.from({ length: rows }).map((_, rowIdx) => /* @__PURE__ */ jsxs("tr", { children: [
			hasSelect && /* @__PURE__ */ jsx("td", {
				className: `align-middle ${VARIANT_ROW_BORDER[variant]}`,
				style: {
					width: "3rem",
					minWidth: "3rem"
				},
				children: /* @__PURE__ */ jsx("span", { className: "block h-4 w-4 mx-auto rounded animate-shimmer" })
			}),
			columns.map((col, colIdx) => /* @__PURE__ */ jsx("td", {
				style: col.width ? { width: col.width } : void 0,
				className: `align-middle ${DENSITY_TD[density]} ${VARIANT_ROW_BORDER[variant]}`,
				children: /* @__PURE__ */ jsx("span", {
					className: "block h-4 rounded animate-shimmer",
					style: {
						width: colIdx === 0 ? `${8 + (rowIdx * 17 + colIdx * 31) % 5}rem` : `${5 + (rowIdx * 13 + colIdx * 23) % 5}rem`,
						animationDelay: `${(rowIdx * columns.length + colIdx) * 40}ms`
					}
				})
			}, col.key)),
			hasMenu && /* @__PURE__ */ jsx("td", {
				className: `align-middle pr-3 ${VARIANT_ROW_BORDER[variant]}`,
				style: {
					width: "3.5rem",
					minWidth: "3.5rem"
				},
				children: /* @__PURE__ */ jsx("span", { className: "block h-5 w-5 ml-auto rounded animate-shimmer" })
			})
		] }, rowIdx))
	});
}
//#endregion
export { Skeleton as default };
