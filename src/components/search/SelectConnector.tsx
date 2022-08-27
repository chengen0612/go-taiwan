import { useCallback } from "react";
import type { SelectProps } from "@mui/material";

import { useAppSelector, useAppDispatch } from "#/utils/hooks/store";

import Select from "#/components/search/Select";

import type { AppSelector } from "#/store";
import { setSearch, SetSearchPayload } from "#/store/slices/search";
import { SearchProperty, Option } from "#/utils/constants/search";

interface SelectConnectorProps {
  name: SearchProperty;
  options: Option[];
  selector: AppSelector<string>;
}

function SelectConnector(props: SelectConnectorProps) {
  const { name, options, selector } = props;

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
    />
  );
}

export default SelectConnector;
