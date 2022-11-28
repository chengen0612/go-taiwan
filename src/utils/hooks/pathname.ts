import { useMemo } from "react";
import { useLocation } from "react-router-dom";

import { Kind } from "#/utils/constants/kind";

/**
 * Return the relative path of sight page.
 * The path will content the kind and the id of the entity.
 */
export const useSightPath = (kind: Kind, id: string) => {
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
    [kind, id] = sightPathInfoString.split("-");
  }

  return { kind, id } as SightPathInfo;
};

/**
 * Return the kind and the id representing current sight page.
 */
export const useSightPathInfo = (): SightPathInfo => {
  const { pathname } = useLocation();
  const sightPathInfo = useMemo(() => destructSightPath(pathname), [pathname]);

  return sightPathInfo;
};
