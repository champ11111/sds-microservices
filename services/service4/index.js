// gik service
const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;

const os = require("os");
const hostname = os.hostname();

const serviceName = "gik"

const dialogue = [
    "ได้เลยจ้ะ คนสวยย เดี๋ยวเค้างล้างให้",
]

const counterIncrement = (queryParams) => {
    if (queryParams[`${serviceName}`]) {
        queryParams[`${serviceName}`] = parseInt(queryParams[`${serviceName}`]) + 1 
    }
    else {
        queryParams[`${serviceName}`] = 1
    }
    return queryParams
}

const getDialogueNo = (queryParams) => {
    if (queryParams[`${serviceName}`]) {
        let c = parseInt(queryParams[`${serviceName}`])
        if (c >= dialogue.length) {
            c = dialogue.length-1
        }
        return c
    }
    else {
        return 0
    }
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    console.log(req.query)
    let c = getDialogueNo(req.query)
    res.send(`pod-${hostname}  > ${serviceName}: ${dialogue[c]}`);
});

app.get("/*", async function (req, res) {
  let c = getDialogueNo(req.query)
  req.query = counterIncrement(req.query)
  console.log(req.query)
  var out = `pod-${hostname}  > ${serviceName}: ${dialogue[c]}`;
  const reqUrl = req.url.split("?")[0]
  const queryParams = req.url.split("?")[1] // todo remove
  if (reqUrl.split("/").length > 1) {
      const service = reqUrl.split("/")[1];
      const path = reqUrl.split("/").slice(2).join("/");
      try {
          // Make a request to the specified service and path
          const result = await axios.get(`http://${service}:3000/${path}`, {
              params: req.query
          });
          out += `\n</br>${result.data}`;
      } catch (error) {
          out += `\n</br>Error contacting ${service}: ${error.message}`;
      }
  }
  res.status(200).send(out);
});

app.listen(port, () => {
console.log(`Example app listening on port ${port}`);
});
