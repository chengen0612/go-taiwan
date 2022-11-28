import { getErrorMessage } from "#/utils/helpers/http-error";
import PageErrorFallback from "#/layouts/PageErrorFallback";

function NotFound() {
  return (
    <PageErrorFallback error={{ code: 404, message: getErrorMessage(404) }} />
  );
}

export default NotFound;
