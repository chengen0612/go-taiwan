import CircularProgress from "@mui/material/CircularProgress";

import ContentBoundary from "#/layouts/ContentBoundary";

function LoadingFallback() {
  return (
    <ContentBoundary sx={{ mt: "1.5rem", textAlign: "center" }}>
      <CircularProgress />
    </ContentBoundary>
  );
}

export default LoadingFallback;
