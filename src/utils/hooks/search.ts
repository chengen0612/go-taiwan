import { useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "./store";
import {
  selectSearch,
  replaceSearch,
  SearchKind,
  SetSearchPayload,
} from "#/store/slices/search";
import { loadEntities } from "#/store/slices/entities";

import { CityName } from "#/utils/constants/city";

const useOnSearchStart = () => {
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
