import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import ContentBoundary from "#/layouts/ContentBoundary";
import Graphic from "#/components/Graphic";

import { Picture, ErrorBody } from "#/utils/models/base";

import NOT_FOUND_PATH from "#/assets/images/not-found.png";
import SAD_PATH from "#/assets/images/sad.png";

interface PageErrorFallbackProps {
  error: ErrorBody;
}

const NOT_FOUND_CODE = 404;
const DEFAULT_ERROR_MESSAGE = "似乎發生了一點問題，請嘗試其他搜尋或稍後再來";

const getFallbackPicture = (errorCode: ErrorBody["code"]): Picture => {
  if (errorCode === NOT_FOUND_CODE) {
    return { url: NOT_FOUND_PATH, description: "查無資料" };
  }
  return { url: SAD_PATH, description: "發生了一點問題" };
};

function PageErrorFallback({ error }: PageErrorFallbackProps) {
  const { code, message } = error;

  const { url, description } = getFallbackPicture(code);

  return (
    <ContentBoundary component="main">
      <Box
        sx={{
          mt: "1.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Graphic src={url} alt={description} sx={{ maxWidth: "37.5rem" }} />
        <Typography
          component="span"
          sx={{ mt: "0.5rem", fontSize: { xs: "0.875rem", sm: "1.125rem" } }}
        >
          {message ?? DEFAULT_ERROR_MESSAGE}
        </Typography>
      </Box>
    </ContentBoundary>
  );
}

export default PageErrorFallback;
