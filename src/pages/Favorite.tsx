import React, { useState, useCallback, useMemo } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { selectFavoritesIDsByKind } from "#/store/slices/favorite";
import { useAppSelector } from "#/utils/hooks/store";
import { getKindValue, KIND, Kind } from "#/utils/constants/kind";
import ResponsiveWrapper from "#/layouts/ResponsiveWrapper";
import { FavoriteCard } from "#/feats/favorite";

function Favorite() {
  const [kind, setKind] = useState<Kind>("attraction");
  const favoritesIDs = useAppSelector(selectFavoritesIDsByKind(kind));
  const hasFavorite = useMemo(() => favoritesIDs.length > 0, [favoritesIDs]);

  const onTabClick = useCallback<
    (event: React.SyntheticEvent, value: Kind) => void
  >((_event, value) => {
    setKind(value);
  }, []);

  return (
    <ResponsiveWrapper maxWidth="md">
      {/* Favorite Filter */}
      <Tabs value={kind} aria-label="選擇最愛類型" onChange={onTabClick}>
        {KIND.all.map(({ key, value }) => (
          <Tab
            key={key}
            label={value}
            value={key}
            sx={{
              width: "25%",
              minWidth: "unset",
              maxWidth: "7.5rem",
            }}
          />
        ))}
      </Tabs>

      {/* Card List */}
      <Box sx={{ mt: "1.75rem", display: "grid", rowGap: "1rem" }}>
        {!hasFavorite
          ? `尚未收藏任何${getKindValue(kind)}`
          : favoritesIDs.map((id) => (
              <FavoriteCard key={id} id={id} kind={kind} />
            ))}
      </Box>
    </ResponsiveWrapper>
  );
}

export default Favorite;
