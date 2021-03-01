const express = require("express");
const { auth, requiresAuth } = require("express-openid-connect");
const path = require("path");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 3000;

app.use(
  auth({
    auth0Logout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
  })
);

app.get("/", (req, res) => {
  res.send(
    req.oidc.isAuthenticated()
      ? res.redirect("/home")
      : //   ? res.sendFile(
        //       path.resolve(
        //         "/Users/tommydates/Desktop/Seinfeld-Restaurant/src/html/index.html"
        //   )
        // )
        "logged out"
  );
});

app.get("/home", (req, res, next) => {
  try {
    console.log("request good");
    res.sendFile(path.join(__dirname, "html"));
  } catch (err) {
    console.log("error", err);
  } finally {
    next();
  }
});

app.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.listen(port, console.log(`Listening on port ${port}`));
