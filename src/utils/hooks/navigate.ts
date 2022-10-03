import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "#/utils/hooks/store";
import { resetSearch } from "#/store/slices/search";

const useOnHome = () => {
  const appDispatch = useAppDispatch();
  const navigate = useNavigate();

  const handler = useCallback(() => {
    appDispatch(resetSearch());
    navigate("/");
  }, [appDispatch, navigate]);

  return handler;
};

export { useOnHome };
