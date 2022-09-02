import { useCallback } from "react";
import type { SxProps, Theme, SelectProps } from "@mui/material";

import { setSearch, SetSearchPayload } from "#/store/slices/search";
import { useAppSelector, useAppDispatch } from "#/utils/hooks/store";

import Select from "#/components/search/Select";

import { SearchProperty } from "#/utils/types/search";

import type { AppSelector } from "#/store";
import type { Option } from "#/utils/types/search";

interface SelectConnectorProps {
  name: SearchProperty;
  options: Option[];
  selector: AppSelector<string>;
  sx?: SxProps<Theme>;
}

function SelectConnector(props: SelectConnectorProps) {
  const { name, options, selector, sx } = props;

  const state = useAppSelector(selector);
  const appDispatch = useAppDispatch();

  const handleChange = useCallback<NonNullable<SelectProps["onChange"]>>(
    (event) => {
      const { name: searchProperty, value } = event.target;
      const payload = { searchProperty, value } as SetSearchPayload;

      appDispatch(setSearch(payload));
    },
    [appDispatch]
  );

  return (
    <Select
      name={name}
      value={state}
      options={options}
      onChange={handleChange}
      sx={sx}
    />
  );
}

export default SelectConnector;
