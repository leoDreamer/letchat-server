import axios from "axios";
// import { Message } from "iview";
// window.$Message = Message; // eslint-disable-line

// 获取cookie
const cookies = {};
(function fetchCookie() { // eslint-disable-line
  const cookie = document.cookie; // eslint-disable-line
  cookie.split(";").forEach(c => {
    const field = c.split("=");
    cookies[field[0].replace(/(^\s*)|(\s*$)/g, "")] = field[1];
  });
})();

// 创建axios实例
const instance = axios.create({
  headers: {
    "x-csrf-token": cookies.csrfToken
  },
  timeout: 30000,
  validateStatus: () => { return true; }
});

instance.message = true;

instance.interceptors.response.use((res) => {
  if (res.status < 200 || res.status >= 300 || res.data.code < 200 || res.data.code >= 300) {
    if (instance.message) {
      window.$Message.info(`${res.data.msg}` || "服务器出现错误"); // eslint-disable-line
    }

    // 暂不抛出错误
    // const error = new Error();
    // error.res = res;
    // throw error;
  } else {
    return res;
  }
});

module.exports = instance;
