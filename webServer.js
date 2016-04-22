var ssid = "evothings-airport";
var pass = "evothings";

function setupServer() {
  var http = require("http");
  var httpServer = http.createServer(function(request, response) {
    console.log(request);
    if (request.url == "/favicon.ico") {
      response.writeHead(404);
      response.end("");
      return;
    }
    response.write("<html><body>");
    if (request.url == "/hello") {
      response.write("This is the world's <b>smallest</b> server!");
    } else if (request.url == "/bye") {
      response.write("Goodbye, I don't like you anyway");
    } else if (request.url == "/") {
      response.write("This is the main page");
    } else {
      response.write("Wrong page!");
    }
    response.end("</body></html>");
  });
  httpServer.listen(80);
  console.log("Server now online!");
}


function onInit() {
  digitalWrite(B9, 1);
  Serial2.setup(9600, {rx: A3, tx: A2});
  var wifi = require("ESP8266WiFi").connect(Serial2, function(err) {
    if (err) throw err;
    wifi.reset(function(err) {
      if (err) throw err;
      wifi.connect(ssid, pass, function(err) {
        if (err) throw err;
        console.log("Connected");
        wifi.getIP(function(err, ip) {
          console.log("Starting WEB server at http://" + ip + "/");
          setupServer();
        });
      });
    });
  });
}