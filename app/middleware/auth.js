const TOKEN = "access_token";

/* istanbul ignore next */
module.exports = option => function* (next) {
  const token = this.cookies.get(TOKEN) || this.headers[TOKEN];

  this.state.auth = Object.assign({ token }, this.state.auth);
  const ret = yield this.app.redis.get(`${option.prefix}:${token}`);
  if (!ret) {
    yield next;
    return;
  }

  let session = null;
  try {
    session = JSON.parse(ret);
  } catch (e) {
    this.error("Session已失效, 请重新登录", 10001);
    yield this.app.redis.set(`${option.prefix}:${token}`, null);
  }

  const user = yield this.model.User.findById(session.user);

  if (!user) {
    yield this.app.redis.set(`${option.prefix}:${token}`, null);}
  this.assert(user, 401, "用户不存在");

  this.state.auth = Object.assign({}, this.state.auth, {
    token,
    user: user.toJSON()
  });

  yield next;
};
