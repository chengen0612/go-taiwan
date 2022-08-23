import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Option } from "#/utils/constants/search";

interface StyledSelectProps {
  name: string;
  options: Option[];
  onChange?: () => void;
}

function StyledSelect({ name, options, onChange }: StyledSelectProps) {
  return (
    <Select
      name={name}
      defaultValue={options[0].value}
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
