//#region src/components/table/utils.ts
function resolveId(row, idKey, columns) {
	if (idKey && row[idKey] !== void 0) return String(row[idKey]);
	if (row["id"] !== void 0) return String(row["id"]);
	const firstKey = columns[0]?.key ?? Object.keys(row)[0];
	return String(row[firstKey] ?? "");
}
//#endregion
export { resolveId };
