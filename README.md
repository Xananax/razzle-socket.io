# Razzle Sockets

## Attempt 1 - Naive implementation

Just following the socket.io tutorial. End up with:

```
Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    at ServerResponse.setHeader (_http_outgoing.js:471:11)
    at ServerResponse.writeHead (_http_server.js:231:21)
```

This error occurs as soon as any change happens anywhere and hmr kicks in.
If I forcefully refresh the page, I get:

```
Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    at ServerResponse.setHeader (_http_outgoing.js:471:11)
    at ServerResponse.header (~/projects/razzle-sockets/node_modules/.registry.npmjs.org/express/4.16.3/node_modules/express/lib/response.js:767:10)
    at ServerResponse.contentType (~/projects/razzle-sockets/node_modules/.registry.npmjs.org/express/4.16.3/node_modules/express/lib/response.js:595:15)
    at ServerResponse.send (~/projects/razzle-sockets/node_modules/.registry.npmjs.org/express/4.16.3/node_modules/express/lib/response.js:145:14)
    at ~/projects/razzle-sockets/build/webpack:/src/server.js:24:1
    at Layer.handle [as handle_request] (~/projects/razzle-sockets/node_modules/.registry.npmjs.org/express/4.16.3/node_modules/express/lib/router/layer.js:95:5)
    at next (~/projects/razzle-sockets/node_modules/.registry.npmjs.org/express/4.16.3/node_modules/express/lib/router/route.js:137:13)
    at Route.dispatch (~/projects/razzle-sockets/node_modules/.registry.npmjs.org/express/4.16.3/node_modules/express/lib/router/route.js:112:3)
    at Layer.handle [as handle_request] (~/projects/razzle-sockets/node_modules/.registry.npmjs.org/express/4.16.3/node_modules/express/lib/router/layer.js:95:5)
    at ~/projects/razzle-sockets/node_modules/.registry.npmjs.org/express/4.16.3/node_modules/express/lib/router/index.js:281:22
```

## Attempt 2 - Put sockets in their on server

create a different file with a different server, listening on a different port

Works, but any change to index.js, where the sockets reside ends up with:

```
Error: bind EADDRINUSE null:3010
    at listenOnMasterHandle (net.js:1394:16)
    at rr (internal/cluster/child.js:121:12)
    at Worker.send (internal/cluster/child.js:88:7)
    at process.onInternalMessage (internal/cluster/utils.js:42:8)
    at process.emit (events.js:187:15)
    at process.emit (~/projects/razzle-sockets/node_modules/.registry.npmjs.org/source-map-support/0.5.6/node_modules/source-map-support/source-map-support.js:454:21)
    at emit (internal/child_process.js:811:12)
    at process._tickCallback (internal/process/next_tick.js:63:19)
```

The server doesn't close