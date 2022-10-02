import { useMemo } from "react";
import { useLocation } from "react-router-dom";

import { Kind } from "#/utils/constants/kind";

/**
 * Return the relative path of sight page.
 * The path will content the kind and the id of the entity.
 */
const useSightPath = (kind: Kind, id: string) => {
  const sightPath = useMemo(() => `/sight/${kind}-${id}`, [kind, id]);

  return sightPath;
};

interface SightPathInfo {
  kind: Kind | undefined;
  id: string | undefined;
}

const destructSightPath = (pathname: string): SightPathInfo => {
  let kind;
  let id;

  const sightPathInfoString = pathname.split("/").pop();

  if (sightPathInfoString) {
    const splitted = sightPathInfoString.split("-");

    kind = splitted[0] as SightPathInfo["kind"];
    id = splitted[1] as SightPathInfo["id"];
  }

  return { kind, id };
};

/**
 * Return the kind and the id representing current sight page.
 */
const useSightPathInfo = (): SightPathInfo => {
  const location = useLocation();
  const { pathname } = location;

  const sightPathInfo = useMemo(() => destructSightPath(pathname), [pathname]);

  return sightPathInfo;
};

export { useSightPath, useSightPathInfo };
