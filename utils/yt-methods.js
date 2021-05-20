const ytdl = require("ytdl-core");
const fetch = require("node-fetch");
const { info } = require("./logger");

function getAudio(videoID, quality, errorCallback) {
  const audioStream = ytdl("http://www.youtube.com/watch?v=" + videoID, {
    quality,
    filter: "audioonly",
  });
  audioStream.on("error", (e) => {
    errorCallback(e);
  });
  info(`Responded with Audio Stream`);
  return audioStream;
}

async function searchVideos(query, num = 1, errorCallback) {
  const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${num}&q=${query}&key=${process.env.GAPI_KEY}&type=video`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    const videos = {
      regionCode: data.regionCode,
      items: data.items.map((item) => {
        return {
          videoID: item.id.videoId,
          title: item.snippet.title,
        };
      }),
    };
    info(`Responded with Search Data`);
    return videos;
  } catch (e) {
    errorCallback(e);
  }
}

module.exports = { getAudio, searchVideos };
