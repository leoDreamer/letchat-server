const { VError } = require("verror");

module.exports = () => function* (next) {
  try {
    yield next;
  } catch (e) {
    if (e instanceof VError) {
      this.body = {
        code: e.code,
        msg: e.message,
        errors: this.app.isProd ? undefined : [e]
      };
      this.status = e.status;
    } else if (e.status && e.statusCode) { // http error caused by ctx.assert
      this.body = {
        code: e.status,
        msg: e.message,
        errors: this.app.isProd ? undefined : [e]
      };
    } else {
      throw e;
    }
  }
};
