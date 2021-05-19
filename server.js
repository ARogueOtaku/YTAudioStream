require("dotenv").config();
const express = require("express");
const ytdl = require("ytdl-core");
const cors = require("cors");
const https = require("https");
const http = require("http");
const app = express();
const { warn, info, error, debug, requestLogger } = require("./utils/logger");
const EV = process.env.NODE_ENV;
app.use(cors());
app.use(requestLogger);

app.get("/keepawake", async (req, res) => {
  res.status(200).send("I'm Awake!");
});

app.get("/getaudio", (req, res) => {
  const videoID = req.query.v;
  const quality = req.query.q;
  ytdl("http://www.youtube.com/watch?v=" + videoID, {
    quality,
    filter: "audioonly",
  })
    .on("error", (e) => {
      error(`Encountered error while geting Audio: ${e.message}`);
      res.status(500).send(`Encountered error: ${e.message}`);
    })
    .pipe(res);
});

const listener = app.listen(process.env.PORT, () => {
  debug(`App is listening on port: ${listener.address().port}`);
});
