// Get entity id from location
// Search for entity data from entities state
//   -> not exist
//        - redirect to not found page
//   -> exist
//        - render
//        - get recommend items by location or search options

import { useLocation } from "react-router-dom";

import { useAppSelector } from "#/utils/hooks/store";
import { selectEntities } from "#/store/slices/entities";

import AttractionSight from "#/components/sight/AttractionSight";
import FoodSight from "#/components/sight/FoodSight";
import HotelSight from "#/components/sight/HotelSight";
import ActivitySight from "#/components/sight/ActivitySight";

import { AllessSearchKind } from "#/utils/constants/searchKind";
import { AnySightProps } from "#/utils/types/sight";

const SightComponentMap: Record<
  AllessSearchKind,
  (props: AnySightProps) => JSX.Element
> = {
  attraction: AttractionSight,
  food: FoodSight,
  hotel: HotelSight,
  activity: ActivitySight,
};

function Sight() {
  const location = useLocation();
  const entities = useAppSelector(selectEntities);

  const entityID = location.pathname.split("/").pop()!;
  const found = Object.entries(entities).find((pair) =>
    pair[1].allIDs.includes(entityID)
  );

  if (!found) {
    // TODO:
    //   | Redirect to not found page.
    //   | Show cannot find message.
    return null;
  }

  // By this step, we got the id and the kind of the entity.
  const searchKind = found[0] as AllessSearchKind;
  const MappedSight = SightComponentMap[searchKind];

  return <MappedSight entityID={entityID} />;
}

export default Sight;
