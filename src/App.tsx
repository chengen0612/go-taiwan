import { BrowserRouter, Routes, Route } from "react-router-dom";

import ScrollToTop from "#/utils/helpers/ScrollToTop";
import PageLayout from "#/layouts/PageLayout";

import * as Pages from "./pages";

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <Routes>
        <Route element={<PageLayout />}>
          <Route index element={<Pages.Home />} />
          <Route path="search" element={<Pages.Search />} />
          <Route path="sight/:entityInfo" element={<Pages.Sight />} />
          <Route path="favorite" element={<Pages.Favorite />} />
          <Route path="*" element={<Pages.NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
