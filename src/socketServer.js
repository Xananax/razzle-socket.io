import express from 'express'
import http from 'http';
import SocketIO from 'socket.io'
import cors from 'cors'

const app = express()

app.use(cors({origin:true,credentials:true}))

const socketServer = http.createServer(app);
const io = SocketIO(socketServer)

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('message', value => {
        console.log('message',value)
        io.emit('message',value)
    })
});
  
const socketPort = (process.env.RAZZLE_SOCKET_PORT || parseInt( process.env.PORT ||  3000, 10 ) + 10 )

let first = true
socketServer.close( err => {
  if(err && !first){ throw err; }
  first = false
  socketServer.listen( socketPort, error => {
      if (error) {
          console.log(error);
      }
      console.log(`🚀 socket on ${socketPort}`);
  })
})
