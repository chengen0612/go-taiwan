import Graphic from "./Graphic";

import NOT_FOUND_PATH from "#/assets/images/not-found.png";
import SAD_PATH from "#/assets/images/sad.png";

interface FallbackProps {
  type?: "not-found" | "default";
  message: string;
}

type FallbackType = NonNullable<FallbackProps["type"]>;

const getImage = (type: FallbackType) =>
  ({
    "not-found": NOT_FOUND_PATH,
    default: SAD_PATH,
  }[type]);

function Fallback({ type = "default", message }: FallbackProps) {
  return (
    <div
      style={{
        marginTop: "1.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Graphic src={getImage(type)} alt={type} sx={{ maxWidth: "37.5rem" }} />
      {message}
    </div>
  );
}

export default Fallback;
export type { FallbackProps };
