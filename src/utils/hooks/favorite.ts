import { useCallback, MouseEventHandler } from "react";

import { selectIsFavorite, toggleFavorite } from "#/store/slices/favorite";
import { useAppSelector, useAppDispatch } from "#/utils/hooks/store";
import type { AnyEntity } from "#/utils/models/entity";

export const useIsFavorite = (entity: AnyEntity) => {
  const { kind, id } = entity;

  const isFavorite = useAppSelector((store) =>
    selectIsFavorite(store, kind, id)
  );

  return isFavorite;
};

export const useOnFavorite = (entity: AnyEntity) => {
  const appDispatch = useAppDispatch();

  const handler = useCallback<MouseEventHandler>(
    (event) => {
      event.preventDefault();
      appDispatch(toggleFavorite(entity));
    },
    [appDispatch, entity]
  );

  return handler;
};
