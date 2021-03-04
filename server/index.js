const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
require("dotenv").config();

app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/home", (req, res) => {
  res.sendFile(express.static(path.join(__dirname + "../src/html/index.html")));
});

// app.use(
//   auth({
//     auth0Logout: true,
//     issuerBaseURL: process.env.ISSUER_BASE_URL,
//     baseURL: process.env.BASE_URL,
//     clientID: process.env.CLIENT_ID,
//     secret: process.env.SECRET,
//   })
// );

// app.get("/", (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? res.redirect("/") : "logged out");
// });

// app.get("/home", (req, res, next) => {
//   try {
//     console.log("request good");
//     res.write("hello");
//     // res.status(200);
//   } catch (err) {
//     // res.status(404);
//     console.log("error", err);
//   } finally {
//     next();
//   }
// });

// app.get("/profile", requiresAuth(), (req, res) => {
//   res.send(JSON.stringify(req.oidc.user));
// });

app.listen(port, console.log(`Listening on port ${port}`));
