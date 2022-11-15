import { useCallback } from "react";

import { useAppDispatch } from "#/utils/hooks/store";
import { resetSearch } from "#/store/slices/search";

const useOnHomepageNavigate = () => {
  const appDispatch = useAppDispatch();

  const handler = useCallback(() => {
    appDispatch(resetSearch());
  }, [appDispatch]);

  return handler;
};

export { useOnHomepageNavigate };
