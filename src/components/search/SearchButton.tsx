import { useCallback } from "react";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";

import { useOnSearchStart } from "#/utils/hooks/search";

function SearchButton() {
  const onSearchStart = useOnSearchStart();

  const handleSubmit = useCallback(() => onSearchStart(), [onSearchStart]);

  return (
    <IconButton
      type="submit"
      aria-label="search"
      onClick={handleSubmit}
      sx={{ alignSelf: "center" }}
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
