exports.login = async function() {
  const user = this.args[0];
  this.app.io.emit("login", {
    name: user.name
  });
};

exports.logout = async function() {
  console.log("logout");
};

exports.message = async function() {
  const message = this.args[0];
  this.app.io.emit("message", message);
};
