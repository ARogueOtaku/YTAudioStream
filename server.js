require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const { error, debug, requestLogger } = require("./utils/logger");
const { getAudio, searchVideos } = require("./utils/yt-methods");
app.use(cors());
app.use(requestLogger);

app.get("/keepawake", (req, res) => {
  res.status(200).send("I'm Awake!");
});

app.get("/getaudio", (req, res) => {
  const videoID = req.query.v;
  const quality = req.query.q;
  const stream = getAudio(videoID, quality, (err) => {
    error(`Encountered error while geting Audio: ${err.message}`);
    res.status(500).send(`Encountered error: ${err.message}`);
  });
  stream.pipe(res);
});

app.get("/search", async (req, res) => {
  const query = req.query.q;
  const num = req.query.n;
  const data = await searchVideos(query, num, (err) => {
    error(`Encountered error while searching Videos: ${err.message}`);
    res.status(500).send(`Encountered error: ${err.message}`);
  });
  res.status(200).json(data);
});

const listener = app.listen(process.env.PORT, () => {
  debug(`App is listening on port: ${listener.address().port}`);
});
