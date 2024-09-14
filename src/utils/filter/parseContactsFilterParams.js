export function parseNumber(value) {
  if(typeof value !== "string") return;

  const parsedInteger = parseInt(value);
  if(Number.isNaN(parsedInteger)) return;

  return parsedInteger;
}
export function parseBool(value) {
  if(typeof value !== "string") return;

  // const parsedBool = Boolean(value);
  // console.log("🚀 ~ parseBool ~ parsedBool:", parsedBool);
  if(!value) return;

  return value;
}
