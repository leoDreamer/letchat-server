import axios from "axios";
import { Notice } from "iview";

const instance = axios.create({
  timeout: 3000,
  validateStatus: () => { return true; }
});

instance.interceptors.response.use((res) => {
  if (res.status < 200 || res.status >= 300 || res.data.code < 200 || res.data.code >= 300) {
    if (instance.message) {
      Notice.info({
        message: `${res.data.msg}`
      });
    }

    // 暂不抛出错误
    // const error = new Error();
    // error.res = res;
    // throw error;
  }
  return res;
});

instance.message = true;

module.exports = instance;
