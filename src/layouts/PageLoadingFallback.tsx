import CircularProgress from "@mui/material/CircularProgress";

import ResponsiveWrapper from "#/layouts/ResponsiveWrapper";

function PageLoadingFallback() {
  return (
    <ResponsiveWrapper sx={{ textAlign: "center" }}>
      <CircularProgress />
    </ResponsiveWrapper>
  );
}

export default PageLoadingFallback;
