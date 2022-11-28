import { selectSearchKind, SearchKind } from "#/store/slices/search";
import { KIND } from "#/utils/constants/kind";
import { SearchProperty } from "#/utils/models/search";
import type { MemberOf } from "#/utils/models/utility";

import { SearchSelect, SearchSelectProps } from "./SearchSelect";

type Option = MemberOf<SearchSelectProps["options"]>;
type SelectKindOptions = (Option & { key: SearchKind })[];

// The order of the options is relative to the view.
const options: SelectKindOptions = [{ key: "all", value: "全部" }, ...KIND.all];

export function SelectKind() {
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
