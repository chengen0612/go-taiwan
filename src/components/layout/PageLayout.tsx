import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";

import SearchBar from "#/components/search/SearchBar";
import SlideCity from "#/components/search/SlideCity";

function PageLayout() {
  return (
    <div>
      {/* Navbar */}
      <Container
        component="nav"
        sx={{
          borderBottom: 1,
          borderColor: "grey.200",
          boxShadow:
            "0px 0px 2px rgba(40, 41, 61, 0.04), 0px 4px 8px rgba(96, 97, 112, 0.16)",
          pt: "1rem",
          px: 0,
        }}
      >
        <SearchBar />
        <SlideCity />
      </Container>

      {/* Body */}
      <Outlet />
    </div>
  );
}

export default PageLayout;
