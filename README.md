# Razzle Sockets

## Attempt 1 - Naive implementation

Just following the tutorial. End up with:

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