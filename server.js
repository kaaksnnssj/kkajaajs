const express = require('express');
const { v1, v2 } = require("node-tiklydown");
const cors = require('cors');
const igdown = require('igdown-scrapper');

const app = express();
app.use(cors());

app.get('/api/tiktok', async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).json({ message: 'Please provide TikTok video URL' });
  }
  try {
    const videoInfo = await v1(url);
    const title = videoInfo.title
    const duration = videoInfo.video.durationFormatted
    const ratio = videoInfo.video.ratio
    const videoUrl = videoInfo.video.noWatermark
    return res.json({ videoUrl, title, duration, ratio });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/api/instagram', async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).json({ message: 'Please provide TikTok video URL' });
  }
  try {
    const videoInfo = await igdown(url);
    const title = videoInfo.meta.title
    const thumb = videoInfo.thumb
    const videoUrl = videoInfo.url[0].url
    return res.json({ videoUrl, title, thumb });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});