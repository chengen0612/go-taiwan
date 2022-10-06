const recordedErrorCode = [403, 404, 429, 500, 503] as const;

type RecordedErrorCode = typeof recordedErrorCode[number];
type ErrorCode = RecordedErrorCode | number;

const isRecordedError = (code: ErrorCode): code is RecordedErrorCode =>
  recordedErrorCode.includes(code as RecordedErrorCode);

const DEFAULT_ERROR_MESSAGE =
  "Oops，似乎發生了一點問題，請嘗試其他搜尋或稍後再回來";
const SERVER_ERROR_MESSAGE = "目前無法取得資料，請稍後再試";

const getErrorMessage = (code: RecordedErrorCode) =>
  ({
    403: "很抱歉，您沒有權限訪問此資料",
    404: "您所訪問的頁面不存在，請嘗試其他搜尋",
    429: "很抱歉，您的單日搜尋次數已達上限，請下次再來",
    500: SERVER_ERROR_MESSAGE,
    503: SERVER_ERROR_MESSAGE,
  }[code]);

class HTTPError extends Error {
  constructor(readonly code: number, message?: string) {
    super(
      message ||
        (isRecordedError(code) ? getErrorMessage(code) : DEFAULT_ERROR_MESSAGE)
    );
  }
}

export default HTTPError;
