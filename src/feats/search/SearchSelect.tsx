import { useCallback } from "react";
import Select, { SelectProps } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useAppSelector } from "#/utils/hooks/store";
import { SetSearchPayload } from "#/store/slices/search";
import { useOnSearchStart } from "#/utils/hooks/search";

import { SearchProperty } from "#/utils/models/search";

import type { RootState } from "#/store";

interface Option {
  [key: string]: unknown;
  key: string;
  value: string;
}

interface SearchSelectProps extends SelectProps {
  name: SearchProperty;
  options: Array<Option>;
  selector: (store: RootState) => string;
}

function SearchSelect(props: SearchSelectProps) {
  const { name, options, selector, sx } = props;

  const state = useAppSelector(selector);
  const onSearchStart = useOnSearchStart();

  const handleChange = useCallback<NonNullable<SelectProps["onChange"]>>(
    (event) => {
      const { name: searchProperty, value } = event.target;
      const payload = { searchProperty, value } as SetSearchPayload;

      onSearchStart(payload);
    },
    [onSearchStart]
  );

  return (
    <Select
      name={name}
      value={state}
      IconComponent={ExpandMoreIcon}
      onChange={handleChange}
      sx={sx}
    >
      {options.map((item) => (
        <MenuItem key={item.key} value={item.key}>
          {item.value}
        </MenuItem>
      ))}
    </Select>
  );
}

export default SearchSelect;
export type { SearchSelectProps };
