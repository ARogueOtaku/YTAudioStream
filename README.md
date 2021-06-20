# **YT Audio Stream**

The **YT Audio Stream** is an API which serves Youtube Audio Stream on Request.

## **API URL**

All Requests to this API should be directed to `https://yd-loader.glitch.me/`

## **Endpoints**

| ENDPOINT | DESCRIPTION                                                  | PARAMETERS                                   |
| -------- | ------------------------------------------------------------ | -------------------------------------------- |
| /audio   | Get Readable Audio Stream for a Particular Youtube Video ID. | `/audio?v={videoid}`                         |
| /title   | Get Title of Video for a Particular Youtube Video ID.        | `/title?v={videoid}`                         |
| /search  | Searches Youtube for Matching Videos against a search term.  | `/search?q={searchterm}&n={numberofmatches}` |

## **FAQ**

#### **1. What Tech Stacks are used to create this API**?

This API was created in _Node.js 12_, using _Express, YTDL-Core_ NPM Library and it is hosted in _Glitch_.

#### **4. Is there a way I can see the Source Code for this API?**

Absolutely, The Full Source Code for this API can found [Here](https://github.com/ARogueOtaku/YTAudioStream).

#### **5. Why does the API take time to return data**?

_Glitch_ Projects go to sleep after `5` minutes of Inactivity, any new requests made will force the API to wake up first and then Respond to the Request. So if you are accessing the API for the 1st time after a while it will take some time. But any subsequent Request should receive an immediate Response.
