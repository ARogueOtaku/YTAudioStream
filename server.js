const express = require("express");
const ytdl = require("ytdl-core");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/", async (req, res) => {
  res.status(400).send("Video Id Required! BAD REQUEST!");
});

app.get("/:url", async (req, res) => {
  const url = req.params.url;
  const quality = req.query.quality || "highest";
  try {
    const info = await ytdl.getInfo(url);
    res.setHeader("title", encodeURI(info.videoDetails.title));
    res.setHeader("content-type", "audio/webm");
    res.setHeader("Access-Control-Expose-Headers", "title");
    ytdl("http://www.youtube.com/watch?v=" + url, {
      quality: quality,
      filter: "audioonly",
    }).pipe(res);
  } catch (e) {
    res.status(500).send("Encountered Error: " + e.message);
  }
});

const listener = app.listen(process.env.PORT, () => {
  console.log("App is listening on port " + listener.address().port);
});
