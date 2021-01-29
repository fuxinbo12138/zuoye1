const express = require("express");
const next = require("next");

const isPreduction = process.env.NODE_ENV === "production";

const app = next({
  dev: isPreduction,
});

const handler = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.get("/hello", (req, res) => {
    res.send('Hello Next.js')
  });
  server.get("*", (req, res) => {
    handler(req, res);
  });

  server.listen(3000, () => console.log("running 3000"));
});
