import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function SightNav() {
  const navigate = useNavigate();

  const onPrevPage = useCallback(() => navigate(-1), [navigate]);

  return (
    <>
      <Box
        component="nav"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "common.white",
          p: "0.5rem 0.75rem",
        }}
      >
        <IconButton aria-label="previous" onClick={onPrevPage}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <IconButton aria-label="favorite">
          <FavoriteBorderIcon />
        </IconButton>
      </Box>
      <Divider />
    </>
  );
}

export default SightNav;
