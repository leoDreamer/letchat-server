import axios from "axios";
import { Message } from "iview";

// 获取cookie
const cookies = {};
(function fetchCookie() { // eslint-disable-line
  const cookie = document.cookie; // eslint-disable-line
  cookie.split(";").forEach(c => {
    const field = c.split("=");
    cookies[field[0]] = field[1];
  });
})();

// 创建axios实例
const instance = axios.create({
  headers: {
    "x-csrf-token": cookies.csrfToken
  },
  timeout: 3000,
  validateStatus: () => { return true; }
});

instance.interceptors.response.use((res) => {
  if (res.status < 200 || res.status >= 300 || res.data.code < 200 || res.data.code >= 300) {
    if (instance.message) {
      Message.info({
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
