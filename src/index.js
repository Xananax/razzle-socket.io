import app from './server';
import http from 'http';
import './socketServer';

const server = http.createServer(app);
let currentApp = app;

server.listen(process.env.PORT || 3000, error => {
  if (error) {
    console.log(error);
  }

  console.log('🚀 started');
});

if (module.hot) {
  console.log('✅  Server-side HMR Enabled!');

  module.hot.accept(['./server','./socketServer'], () => {
    console.log('🔁  HMR Reloading `./server`...');
    server.removeListener('request', currentApp);
    const newApp = require('./server').default;
    const newSocket = require('./socketServer').default;
    server.on('request', newApp);
    currentApp = newApp;
  });
}
