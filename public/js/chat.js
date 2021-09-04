const Chat = function (socket) {
  this.socket = socket;
};

Chat.prototype.sendMessage = function (room, text) {
  const message = {
    room,
    text,
  };

  this.socket.emit('message', message);
};

Chat.prototype.changeRoom = function (room) {
  this.socket.emit('join', { newRoom: room });
};

Chat.prototype.processCommand = function (command) {
  const words = command.split(' ');
  const parseCommand = words[0].substring(1, words[0].length).toLowerCase();

  const message = false;

  switch (parseCommand) {
    case 'join':
      words.shift();
      const room = words.join(' ');
      this.changeRoom(room);
      break;
    case 'nick':
      words.shift();
      const name = words.join(' ');
      this.socket.emit('nameAttempt', name);
      break;
    default:
      message = 'Unrecognized command.';
      break;
  }

  return message;
};
