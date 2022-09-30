import { Outlet } from "react-router-dom";
import Box from "@mui/system/Box";

import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingBar from "#/components/action/FloatingBar";

function PageLayout() {
  return (
    <Box sx={{ position: "relative", height: "100vh" }}>
      <Navbar />
      <Outlet />
      <Footer />
      <FloatingBar />
    </Box>
  );
}

export default PageLayout;
