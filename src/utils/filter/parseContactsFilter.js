
import { parseBool, parseContactType } from "./parseContactsFilterParams.js";

export default function parseContactsFilter({isFavourite , type}) {
  const parsedIsFavourite = parseBool(isFavourite);
  const parsedType = parseContactType(type);


  return {isFavourite: parsedIsFavourite , contactType: parsedType};
}
