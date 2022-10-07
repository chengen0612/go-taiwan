import { useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "./store";
import { selectSearch, replaceSearch, SearchKind } from "#/store/slices/search";
import { selectIsError, resetStatus } from "#/store/slices/status";
import { loadEntities } from "#/store/slices/entities";

import { CityName } from "#/utils/constants/city";

const useOnSearchStart = () => {
  const appDispatch = useAppDispatch();
  const navigate = useNavigate();

  const search = useAppSelector(selectSearch);
  const isError = useAppSelector(selectIsError);

  const handler = useCallback(() => {
    const { kind, city, keyword } = search;

    if (isError) {
      appDispatch(resetStatus());
    }

    navigate(`/search?kind=${kind}&city=${city}&keyword=${keyword}`);
  }, [appDispatch, navigate, search, isError]);

  return handler;
};

/**
 * Synchronize search state with query string, query data with result search options.
 */
const useOnSearchEnd = () => {
  const [searchParams] = useSearchParams();
  const appDispatch = useAppDispatch();

  const handler = useCallback(() => {
    const kind = searchParams.get("kind") as SearchKind;
    const city = searchParams.get("city") as CityName;
    const keyword = searchParams.get("keyword");

    appDispatch(replaceSearch({ kind, city, keyword }));
    appDispatch(loadEntities());
  }, [searchParams, appDispatch]);

  return handler;
};

export { useOnSearchStart, useOnSearchEnd };
