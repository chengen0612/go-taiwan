import { Outlet } from "react-router-dom";

import Footer from "./Footer";

function PageLayout() {
  return (
    <div>
      {/* Body */}
      <Outlet />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default PageLayout;
