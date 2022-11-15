import CircularProgress from "@mui/material/CircularProgress";

import ContentBoundary from "#/layouts/ContentBoundary";

function PageLoadingFallback() {
  return (
    <ContentBoundary sx={{ mt: "1.5rem", textAlign: "center" }}>
      <CircularProgress />
    </ContentBoundary>
  );
}

export default PageLoadingFallback;
