const http = require("http");
const fs = require("fs");
const port = 9000;
http
  .createServer((req, res) => {
    fs.readFile("src/html/Reservations.html", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  })
  .listen(port);

// app.get("/", function (req, res) {
//   res.render("Reservation.html");
// });

// app.listen(`Listening on port :${port}`);
