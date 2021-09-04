const server = require('./src/app');
const chatSever = require('./lib/chat_server');

server.listen(3000, () => console.log('Server listening on port 3000.'));

chatSever.listen(server);
