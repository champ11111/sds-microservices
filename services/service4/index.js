const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;

const os = require("os");
const hostname = os.hostname();

app.get("/", (req, res) => {
    res.send(`Hello World From Service4 from ${hostname}!`);
});

app.get("/*", async function (req, res) {
    var out = `Hello World From Service4 from ${hostname}!`;
    if (req.url.split("/").length > 1) {
        const service = req.url.split("/")[1];
        const path = req.url.split("/").slice(2).join("/");
        try {
            // Make a request to the specified service and path
            const result = await axios.get(`http://${service}:3000/${path}`);
            out += `\nResponse from ${service}: ${result.data}`;
        } catch (error) {
            out += `\nError contacting ${service}: ${error.message}`;
        }
    }
    res.status(200).send(out);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
