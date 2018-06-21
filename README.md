# Razzle-Socket.Io

An example of using [Razzle](https://github.com/jaredpalmer/razzle) with [Socket.io](https://socket.io) and make everything work with HMR.

The difficulty comes from the fact that I couldn't find a way to "unmount" a socket.io process once it is hooked with the server, the way you can use `server.removeEventListener`.

The solution I've found: stopping the server entirely and restarting it