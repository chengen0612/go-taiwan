import React from "react";

import { useAppSelector } from "#/utils/hooks/store";
import { selectStatus } from "#/store/slices/status";

import ContentBoundary from "./ContentBoundary";
import Fallback from "#/components/Fallback";

interface PageBoundaryProps {
  children: React.ReactElement | null;
}

function PageBoundary({ children }: PageBoundaryProps) {
  const { isError, errorCode, errorMessage } = useAppSelector(selectStatus);

  return isError ? (
    <ContentBoundary component="main">
      <Fallback
        type={errorCode === 404 ? "not-found" : undefined}
        message={errorMessage || "似乎發生了一點問題，請嘗試其他搜尋或稍後再來"}
      />
    </ContentBoundary>
  ) : (
    children
  );
}

export default PageBoundary;
