exports.login = async function() {
  const user = this.args[0];
  await this.model.User.update({ login: true }, { where: { id: user.id } });
  const onlineUsers = await this.model.User.findAll({ where: { login: true } });
  this.app.io.emit("login", {
    name: user.name
  });
  this.app.io.emit("online_user", {
    users: onlineUsers
  });
};

exports.logout = async function() {
  console.log("logout");
};

exports.message = async function() {
  const message = this.args[0];
  this.app.io.emit("message", message);
};
