const opn = require("opn");
const handler = require("serve-handler");
const http = require("http");

const server = http.createServer((request, response) => {
  // You pass two more arguments for config and middleware
  // More details here: https://github.com/vercel/serve-handler#options
  return handler(request, response, {
    // redirects: true
    rewrites: [{ source: "/**", destination: "/index.html" }],
  });
});

server.listen(9000, () => {
  console.log(
    "Starting PLC toolkit server at 127.0.0.1:9000\n\nClose this window when finished using the tool.\np.crandall '20'"
  );
});

//launch the page.
opn("../s7_server/s7_Server.exe");
opn("http://127.0.0.1:9000");
