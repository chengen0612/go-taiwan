import { BrowserRouter, Routes, Route } from "react-router-dom";

import PageLayout from "./components/layout/PageLayout";
import * as Pages from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Pages.Home />} />
        {/* TODO: Design common layout for pages that are not homepage */}
        <Route element={<PageLayout />}>
          <Route path="search" element={<Pages.Search />} />
          <Route path="*" element={<main>Unserved pathname!</main>} />
        </Route>
        <Route path="sight/:entityId" element={<Pages.Sight />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
