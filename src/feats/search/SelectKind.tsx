import SearchSelect from "#/feats/search/SearchSelect";

import { selectSearchKind } from "#/store/slices/search";

import { SEARCH_KIND } from "#/utils/constants/searchKind";
import { SearchProperty } from "#/utils/types/search";

function SelectKind() {
  return (
    <SearchSelect
      name={SearchProperty.Kind}
      options={SEARCH_KIND.all}
      selector={selectSearchKind}
      sx={{
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
      }}
    />
  );
}

export default SelectKind;
