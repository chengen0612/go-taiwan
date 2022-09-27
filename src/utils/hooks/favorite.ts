import { useCallback, MouseEventHandler } from "react";

import { useAppSelector, useAppDispatch } from "#/utils/hooks/store";
import { selectIsFavorite, toggleFavorite } from "#/store/slices/favorite";

import { AnyEntity } from "#/utils/types/entity";

const useIsFavorite = (entity: AnyEntity) => {
  const { kind, id } = entity;

  const isFavorite = useAppSelector((store) =>
    selectIsFavorite(store, kind, id)
  );

  return isFavorite;
};

const useOnFavorite = (entity: AnyEntity) => {
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

export { useIsFavorite, useOnFavorite };
