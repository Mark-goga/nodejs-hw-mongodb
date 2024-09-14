import { parseBool } from "./parseContactsFilterParams.js";

export default function parseContactsFilter({isFavourite}) {
  const parsedIsFavourite = parseBool(isFavourite);

  return {isFavourite: parsedIsFavourite};
}
