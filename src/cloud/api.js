import axios from "axios";

const defaultPagination = 20;
const instance = axios.create({
  baseURL: "http://45.32.99.230:3000",
  timeout: 60000
});

export function fetchStore() {
  return instance.get("/store/", {
    params: {
      limit: defaultPagination
    }
  });
}

export function getGlobalData() {
  return instance.get("/v2/global/");
}

export function getHistoricalData(period, symbol) {
  let url = "/history{period}/{symbol}";
  url = url.replace("{period}", period == null ? "" : "/" + period);
  url = url.replace("{symbol}", symbol);
  return axios
    .create({
      baseURL: "http://coincap.io",
      timeout: 30000
    })
    .get(url);
}
