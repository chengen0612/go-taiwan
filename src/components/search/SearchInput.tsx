import { useCallback, FocusEventHandler } from "react";
import InputBase from "@mui/material/InputBase";

import {
  selectSearchKeyword,
  setSearch,
  SetSearchPayload,
} from "#/store/slices/search";
import { useAppSelector, useAppDispatch } from "#/utils/hooks/store";
import { SearchProperty } from "#/utils/types/search";

function SearchInput() {
  const keyword = useAppSelector(selectSearchKeyword);
  const appDispatch = useAppDispatch();

  const handleChange = useCallback<FocusEventHandler<HTMLInputElement>>(
    (event) => {
      const { name: searchProperty, value } = event.target;
      const payload = { searchProperty, value } as SetSearchPayload;

      appDispatch(setSearch(payload));
    },
    [appDispatch]
  );

  return (
    <InputBase
      type="search"
      name={SearchProperty.Keyword}
      placeholder="輸入關鍵字..."
      value={keyword}
      autoComplete="off"
      onChange={handleChange}
      fullWidth
      sx={{
        borderRadius: "2rem",
        pl: "1.5rem",
        bgcolor: "grey.100",
      }}
    />
  );
}

export default SearchInput;
