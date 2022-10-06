import { useCallback } from "react";

import { useAppSelector, useAppDispatch } from "#/utils/hooks/store";
import { resetSearch } from "#/store/slices/search";
import { selectIsError, resetStatus } from "#/store/slices/status";

const useOnHomepage = () => {
  const appDispatch = useAppDispatch();
  const isError = useAppSelector(selectIsError);

  const handler = useCallback(() => {
    appDispatch(resetSearch());

    if (isError) {
      appDispatch(resetStatus());
    }
  }, [appDispatch, isError]);

  return handler;
};

const useOnFavoritePage = () => {
  const appDispatch = useAppDispatch();
  const isError = useAppSelector(selectIsError);

  const handler = useCallback(() => {
    if (isError) {
      appDispatch(resetStatus());
    }
  }, [appDispatch, isError]);

  return handler;
};

export { useOnHomepage, useOnFavoritePage };
