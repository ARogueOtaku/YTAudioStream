const express = require("express");
const ytdl = require("ytdl-core");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/:url", async (req, res) => {
  const url = req.params.url;
  if (!url) res.status(400).send("Video Id Required! BAD REQUEST!");
  const quality = req.query.quality || "highest";
  res.setHeader("content-type", "audio/webm");
  res.setHeader("Access-Control-Expose-Headers", "title");
  const info = await ytdl.getInfo(url);
  res.setHeader("title", encodeURI(info.videoDetails.title));
  console.log(req.origin);
  ytdl("http://www.youtube.com/watch?v=" + url, {
    quality: quality,
    filter: "audioonly",
  }).pipe(res);
});

const listener = app.listen(process.env.PORT, () => {
  console.log("App is listening on port " + listener.address().port);
});
