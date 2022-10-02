import SearchSelect, { SearchSelectProps } from "#/feats/search/SearchSelect";

import { selectSearchKind, SearchKind } from "#/store/slices/search";

import { SearchProperty } from "#/utils/models/search";
import { KIND } from "#/utils/constants/kind";

import type { MemberOf } from "#/utils/models/utility";

type Option = MemberOf<SearchSelectProps["options"]>;
type SelectKindOptions = (Option & { key: SearchKind })[];

const options: SelectKindOptions = [{ key: "all", value: "全部" }, ...KIND.all];

function SelectKind() {
  return (
    <SearchSelect
      name={SearchProperty.Kind}
      options={options}
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
