const crypto = require("crypto");

module.exports = app => {
  class Wechat extends app.Controller {
    async verify(ctx) {
      const { signature, timestamp, nonce, echostr } = ctx.query;
      const array = [app.config.wechat.token, timestamp, nonce];
      array.sort();

      // 将三个参数字符串拼接成一个字符串进行sha1加密
      const tempStr = array.join("");
      const hashCode = crypto.createHash("sha1"); //创建加密类型
      const resultCode = hashCode.update(tempStr, "utf8").digest("hex"); //对传入的字符串进行加密

      // 开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
      if (resultCode === signature){
          ctx.body = echostr;
      } else {
          ctx.body = "mismatch";
      }
    }
  }

  return Wechat;
};
