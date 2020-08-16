const express = require("express");
const app = express();
const port = 3000;

app.get("/", function (req, res) {
  res.render("Reservation.html");
});

app.listen(`Listening on port :${port}`);
