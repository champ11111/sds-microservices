const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;

const os = require("os");
const hostname = os.hostname();

app.get("/", (req, res) => {
  res.send(`Hello World From Service2 from ${hostname}!`);
});

app.get("/*", async function (req, res) {
  const path = req.url.split("/").slice(2).join("/");
  const service = req.url.split("/")[1];

  try {
    const result = await axios.get(`http://${service}:3000/${path}`);
    res.status(200).send(result.data);
  } catch (error) {
    res.status(500).send("Error forwarding request");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
