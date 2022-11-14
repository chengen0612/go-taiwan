import { Outlet } from "react-router-dom";
import Box from "@mui/system/Box";

import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingBar from "./FloatingBar";

import { NAVBAR_HEIGHT } from "#/layouts/Navbar";

function PageLayout() {
  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />
      <Box component="main" sx={{ flex: 1, mt: NAVBAR_HEIGHT }}>
        <Outlet />
      </Box>
      <Footer />
      <FloatingBar />
    </Box>
  );
}

export default PageLayout;
