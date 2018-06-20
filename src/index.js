import app from './server';
import http from 'http';
import SocketIO from 'socket.io'

const server = http.createServer(app);
const io = SocketIO(server)
let currentApp = app;

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('message', value => {
    console.log('message',value)
    io.emit('message',value)
  })
});

server.listen(process.env.PORT || 3000, error => {
  if (error) {
    console.log(error);
  }

  console.log('🚀 started');
});

if (module.hot) {
  console.log('✅  Server-side HMR Enabled!');

  module.hot.accept('./server', () => {
    console.log('🔁  HMR Reloading `./server`...');
    server.removeListener('request', currentApp);
    const newApp = require('./server').default;
    server.on('request', newApp);
    currentApp = newApp;
  });
}
