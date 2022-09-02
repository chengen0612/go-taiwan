import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import type { SxProps, Theme, SelectProps } from "@mui/material";

import type { Option } from "#/utils/types/search";

interface StyledSelectProps {
  name: string;
  value: string;
  options: Option[];
  onChange: SelectProps["onChange"];
  sx?: SxProps<Theme>;
}

function StyledSelect(props: StyledSelectProps) {
  const { name, value, options, onChange, sx } = props;

  return (
    <Select
      name={name}
      value={value}
      IconComponent={ExpandMoreIcon}
      onChange={onChange}
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

export default StyledSelect;
