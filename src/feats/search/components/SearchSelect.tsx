import { useCallback } from "react";
import Select, { SelectProps } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import type { RootState } from "#/store";
import type { SetSearchPayload } from "#/store/slices/search";
import { useAppSelector } from "#/utils/hooks/store";
import type { SearchProperty } from "#/utils/models/search";

import { useOnSearchStart } from "../hooks";

interface Option {
  [key: string]: unknown;
  key: string;
  value: string;
}

export interface SearchSelectProps extends SelectProps {
  name: SearchProperty;
  options: Array<Option>;
  selector: (store: RootState) => string;
}

export function SearchSelect(props: SearchSelectProps) {
  const { name, options, selector, sx } = props;
  const onSearchStart = useOnSearchStart();
  const selectedValue = useAppSelector(selector);

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
      value={selectedValue}
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
