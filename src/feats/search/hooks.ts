import { useMemo, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  selectSearch,
  replaceSearch,
  SearchState,
  SetSearchPayload,
} from "#/store/slices/search";
import { loadEntities } from "#/store/slices/entities";
import { useAppSelector, useAppDispatch } from "#/utils/hooks/store";

/**
 *  Return the search parameters in object shape.
 */
export const useSearchPath = () => {
  const [searchParams] = useSearchParams();
  const searchParamsObject = useMemo(
    () => Object.fromEntries(searchParams) as unknown as SearchState,
    [searchParams]
  );

  return searchParamsObject;
};

/**
 * Navigate to the search page using the options provided.
 */
export const useOnSearchStart = () => {
  const navigate = useNavigate();
  const search = useAppSelector(selectSearch);

  const handler = useCallback(
    (payload?: SetSearchPayload) => {
      let nextOptions = search;

      if (payload) {
        const { searchProperty, value } = payload;
        nextOptions = { ...nextOptions, [searchProperty]: value };
      }

      const { kind, city, keyword } = nextOptions;
      navigate(`/search?kind=${kind}&city=${city}&keyword=${keyword}`);
    },
    [navigate, search]
  );

  return handler;
};

/**
 * Synchronize search state with query string, query data with result search options.
 */
export const useOnSearchEnd = () => {
  const appDispatch = useAppDispatch();
  const searchParams = useSearchPath();

  const handler = useCallback(() => {
    appDispatch(replaceSearch(searchParams));
    appDispatch(loadEntities());
  }, [appDispatch, searchParams]);

  return handler;
};
