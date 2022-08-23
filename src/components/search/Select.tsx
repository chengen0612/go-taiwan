import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import type { SelectProps } from "@mui/material";

import type { Option } from "#/utils/constants/search";

interface StyledSelectProps {
  name: string;
  value: string;
  options: Option[];
  onChange: SelectProps["onChange"];
}

function StyledSelect({ name, value, options, onChange }: StyledSelectProps) {
  return (
    <Select
      name={name}
      value={value}
      IconComponent={ExpandMoreIcon}
      onChange={onChange}
    >
      {options.map((item) => (
        <MenuItem key={item.key} value={item.value}>
          {item.value}
        </MenuItem>
      ))}
    </Select>
  );
}

export default StyledSelect;
