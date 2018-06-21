import app from './server';
import ioHandler from './socket';
import { Server } from 'http';
import SocketIO from 'socket.io'

const port = process.env.PORT || 3000

let server;
let currentApp;
let io;

const stop = (cb) => {
  if(!server){ return cb()}
  console.log('stopping the server')
  currentApp = null
  console.log('sdfdsfdf')
  io.close( err => {
    console.log('server closed')
    if(err){ console.error(err.message) }
    server = null
    io = null
    return cb()
  })
}

const start = ( newApp, newIoHandler ) => {
  console.log('starting the server')
  server = Server(newApp);
  currentApp = newApp;
  io = SocketIO(server)
  newIoHandler(io)
  server.listen( port, error => {
      if (error) { throw error }
      console.log(`🚀 started on ${port}`);
  })
}

const restart = ( app, socket ) => stop( () => {
  console.log('server stopped')
  start(app, socket)
})

if (module.hot) {
  console.log('✅  Server-side HMR Enabled!');

  module.hot.accept(['./server','./socket'], () => {
    console.log('🔁  HMR Reloading...');
    const newApp = require('./server').default;
    const newIoHandler = require('./socket').default;
    restart( newApp, newIoHandler )
  });
}

start(app, ioHandler)