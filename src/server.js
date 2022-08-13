// Simple Express server setup to serve the build output
const express = require("express");
const cors = require("cors");
const jsforce = require("jsforce");

const config = require("./config");

const app = express();
app.use(cors());

const connection = new jsforce.Connection();
const { USER, PASSWORD, TOKEN } = config;
connection.login(USER, PASSWORD + TOKEN, (err, userInfor) => {
  if (err) {
    console.log("Login fail: ", err);
  } else {
    console.log("Login with: ", userInfor);
  }
});

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3001;

app.use("/connection", (req, res) => {
  res.send({
    limitInfo: connection.limitInfo,
    userInfo: connection.userInfo,
    instanceUrl: connection.instanceUrl,
  });
});

app.use("/describeGlobal", (req, res) => {
  connection
    .describeGlobal()
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(304);
      res.send(err);
    });
});

app.use("/describe", (req, res) => {
  const { sobjectName } = req.query;
  connection
    .describe(sobjectName)
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(304);
      res.send(err);
    });
});

app.use("/query", (req, res) => {
  const { q } = req.query;
  console.log(q);
  connection
    .query(q)
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(304);
      res.send(err);
    });
});

app.use("/queryAll", (req, res) => {
  const { q } = req.query;
  connection
    .queryAll(q)
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(304);
      res.send(err);
    });
});

app.listen(PORT, () =>
  console.log(`✅  Server started: http://${HOST}:${PORT}`)
);
