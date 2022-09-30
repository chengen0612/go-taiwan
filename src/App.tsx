import { BrowserRouter, Routes, Route } from "react-router-dom";

import PageLayout from "#/layouts/PageLayout";
import * as Pages from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* TODO: Design common layout for pages that are not homepage */}
        <Route element={<PageLayout />}>
          <Route index element={<Pages.Home />} />
          <Route path="search" element={<Pages.Search />} />
          <Route path="sight/:entityInfo" element={<Pages.Sight />} />
          <Route path="favorite" element={<Pages.Favorite />} />
          <Route path="*" element={<main>Unserved pathname!</main>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
