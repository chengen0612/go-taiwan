import React, { useState, useCallback } from "react";
import Tabs from "@mui/material/Tabs";

import { useAppSelector } from "#/utils/hooks/store";
import { selectFavoritesIDsByKind } from "#/store/slices/favorite";

import { S, FavoriteCard } from "#/feats/favorite";

import { AllessSearchKind, getKindValue } from "#/utils/constants/searchKind";

function Favorite() {
  const [kind, setKind] = useState<AllessSearchKind>("attraction");
  const favoritesIDs = useAppSelector(selectFavoritesIDsByKind(kind));

  const onTabClick = useCallback<
    (event: React.SyntheticEvent, value: AllessSearchKind) => void
  >((_event, value) => {
    setKind(value);
  }, []);

  return (
    <S.Root>
      {/* Tabs */}
      <Tabs value={kind} aria-label="選擇最愛類型" onChange={onTabClick}>
        <S.Tab label={getKindValue("attraction")} value="attraction" />
        <S.Tab label={getKindValue("food")} value="food" />
        <S.Tab label={getKindValue("hotel")} value="hotel" />
        <S.Tab label={getKindValue("activity")} value="activity" />
      </Tabs>

      {/* Cards */}
      <S.CardList>
        {favoritesIDs.length === 0
          ? `目前沒有任何收藏${getKindValue(kind)}`
          : favoritesIDs.map((id) => (
              <FavoriteCard key={id} id={id} kind={kind} />
            ))}
      </S.CardList>
    </S.Root>
  );
}

export default Favorite;
