/** Both parameters should be a valid time string. */
const getPeriod = (startTime: string, endTime: string) =>
  [startTime, endTime]
    .map((value) => new Date(value).toLocaleDateString("zh-TW"))
    .join(" - ");

export { getPeriod };
