import { useCallback, ChangeEventHandler, KeyboardEventHandler } from "react";
import InputBase from "@mui/material/InputBase";

import {
  selectSearchKeyword,
  setSearch,
  SetSearchPayload,
} from "#/store/slices/search";
import { useAppSelector, useAppDispatch } from "#/utils/hooks/store";
import { SearchProperty } from "#/utils/models/search";

import { useOnSearchStart } from "../hooks";

export function SearchInput() {
  const appDispatch = useAppDispatch();
  const onSearchStart = useOnSearchStart();
  const keyword = useAppSelector(selectSearchKeyword);

  const getPayloadFromTarget = useCallback((element: HTMLInputElement) => {
    const { name: searchProperty, value } = element;
    return { searchProperty, value } as SetSearchPayload;
  }, []);

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      const payload = getPayloadFromTarget(event.target);
      appDispatch(setSearch(payload));
    },
    [appDispatch, getPayloadFromTarget]
  );

  const handleKeyDown = useCallback<KeyboardEventHandler<HTMLInputElement>>(
    (event) => {
      if (event.key === "Enter") {
        const payload = getPayloadFromTarget(event.target as HTMLInputElement);
        onSearchStart(payload);
      }
    },
    [onSearchStart, getPayloadFromTarget]
  );

  return (
    <InputBase
      type="search"
      name={SearchProperty.Keyword}
      value={keyword}
      placeholder="輸入關鍵字..."
      autoComplete="off"
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      fullWidth
      sx={{
        borderRadius: "2rem",
        pl: "1.5rem",
        bgcolor: "grey.100",
      }}
    />
  );
}
