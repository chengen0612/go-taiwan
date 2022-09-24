const CITY_TABLE = {
  taipei: { key: "taipei", value: "臺北市", tdxCityName: "Taipei" },
  newTaipei: { key: "newTaipei", value: "新北市", tdxCityName: "NewTaipei" },
  taoyuan: { key: "taoyuan", value: "桃園市", tdxCityName: "Taoyuan" },
  taichung: { key: "taichung", value: "臺中市", tdxCityName: "Taichung" },
  tainan: { key: "tainan", value: "臺南市", tdxCityName: "Tainan" },
  kaohsiung: { key: "kaohsiung", value: "高雄市", tdxCityName: "Kaohsiung" },
  keelung: { key: "keelung", value: "基隆市", tdxCityName: "Keelung" },
  hsinchu: { key: "hsinchu", value: "新竹市", tdxCityName: "Hsinchu" },
  hsinchuCounty: {
    key: "hsinchuCounty",
    value: "新竹縣",
    tdxCityName: "HsinchuCounty",
  },
  miaoliCounty: {
    key: "miaoliCounty",
    value: "苗栗縣",
    tdxCityName: "MiaoliCounty",
  },
  changhuaCounty: {
    key: "changhuaCounty",
    value: "彰化縣",
    tdxCityName: "ChanghuaCounty",
  },
  nantouCounty: {
    key: "nantouCounty",
    value: "南投縣",
    tdxCityName: "NantouCounty",
  },
  yunlinCounty: {
    key: "yunlinCounty",
    value: "雲林縣",
    tdxCityName: "YunlinCounty",
  },
  chiayiCounty: {
    key: "chiayiCounty",
    value: "嘉義縣",
    tdxCityName: "ChiayiCounty",
  },
  chiayi: { key: "chiayi", value: "嘉義市", tdxCityName: "Chiayi" },
  pingtungCounty: {
    key: "pingtungCounty",
    value: "屏東縣",
    tdxCityName: "PingtungCounty",
  },
  hualienCounty: {
    key: "hualienCounty",
    value: "花蓮縣",
    tdxCityName: "HualienCounty",
  },
  yilanCounty: {
    key: "yilanCounty",
    value: "宜蘭縣",
    tdxCityName: "YilanCounty",
  },
  taitungCounty: {
    key: "taitungCounty",
    value: "桃園縣",
    tdxCityName: "TaitungCounty",
  },
  kinmenCounty: {
    key: "kinmenCounty",
    value: "金門縣",
    tdxCityName: "KinmenCounty",
  },
  penghuCounty: {
    key: "penghuCounty",
    value: "澎湖縣",
    tdxCityName: "PenghuCounty",
  },
  lienchiangCounty: {
    key: "lienchiangCounty",
    value: "連江縣",
    tdxCityName: "LienchiangCounty",
  },
} as const;

export type CityName = keyof typeof CITY_TABLE;

export type CityValue = typeof CITY_TABLE[CityName]["value"];

export const CITY = {
  byName: CITY_TABLE,
  allNames: Object.keys(CITY_TABLE),
  all: Object.values(CITY_TABLE),
};
