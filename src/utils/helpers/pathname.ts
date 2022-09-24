import { AllessSearchKind } from "#/utils/constants/searchKind";

/**
 * Return the relative path of sight page.
 * The path will content the kind and the id of the entity.
 */
const constructSightPath = (kind: AllessSearchKind, id: string) =>
  `/sight/${kind}-${id}`;

/**
 * Return the kind and the id representing current sight page.
 */
interface DestructSightPathOutput {
  kind: AllessSearchKind | undefined;
  id: string | undefined;
}
const destructSightPath = (pathname: string): DestructSightPathOutput => {
  let kind;
  let id;

  const entityInfo = pathname.split("/").pop();

  if (entityInfo) {
    const splitted = entityInfo.split("-");

    kind = splitted[0] as DestructSightPathOutput["kind"];
    id = splitted[1] as DestructSightPathOutput["id"];
  }

  return { kind, id };
};

export { constructSightPath, destructSightPath };
