const express = require("express");
const app = express();
const port = 3000;

var os = require("os");
var hostname = os.hostname();

app.get("/", (req, res) => {
  res.send(`Hello World From Service4 from ${hostname}!`);
});

app.get("/*", async function (req, res) {
  var out = `Hello World From Service1 from ${hostname}!`;
  if (req.url.split("/").length > 1) {
    const service = req.url.split("/")[1];
    const path = req.url.split("/").slice(2).join("/");
    const result = await request({
      uri: path,
      baseUrl: `http://${service}:3000/`,
      json: false,
    });
  }
  res.status(200);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
