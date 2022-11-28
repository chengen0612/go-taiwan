import { useCallback } from "react";

import { resetSearch } from "#/store/slices/search";
import { useAppDispatch } from "#/utils/hooks/store";

export const useOnHomepageNavigate = () => {
  const appDispatch = useAppDispatch();

  const handler = useCallback(() => {
    appDispatch(resetSearch());
  }, [appDispatch]);

  return handler;
};
