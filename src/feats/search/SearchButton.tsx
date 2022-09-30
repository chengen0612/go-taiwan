import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";

import { useOnSearchStart } from "#/utils/hooks/search";

function SearchButton() {
  const onSearchStart = useOnSearchStart();

  return (
    <IconButton
      type="submit"
      size="large"
      aria-label="search"
      onClick={onSearchStart}
      sx={{ alignSelf: "center", p: "unset" }}
    >
      <Avatar
        sx={{
          height: "2.25rem",
          width: "2.25rem",
          bgcolor: "primary.main",
        }}
      >
        <SearchIcon />
      </Avatar>
    </IconButton>
  );
}

export default SearchButton;
