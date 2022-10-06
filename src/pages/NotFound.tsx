import Fallback from "#/components/Fallback";

import { getErrorMessage } from "#/utils/helpers/http-error";

function NotFound() {
  return <Fallback type="not-found" message={getErrorMessage(404)} />;
}

export default NotFound;
