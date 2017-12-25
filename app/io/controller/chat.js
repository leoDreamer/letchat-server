exports.index = async function() {
  const message = this.args[0];
  console.log('11111111111111 controller index')
  await this.socket.emit('res', `Hi! I've got your message: ${message}`);
};

exports.connect = async function() {
  const message = this.args[0];
  console.log('11111111111111 controller index')
  await this.socket.emit('res', `Hi! I've got your message: ${message}`);
};