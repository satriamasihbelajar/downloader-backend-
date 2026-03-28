const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/download", async (req, res) => {
  const url = req.query.url;

  try {
    let tiktok = await axios.get(`https://tikwm.com/api/?url=${url}`);

    if (tiktok.data?.data?.play) {
      return res.json({ video: tiktok.data.data.play });
    }

    let other = await axios.get(`https://api.savetube.me/info?url=${url}`);

    if (other.data?.data?.url) {
      return res.json({ video: other.data.data.url });
    }

    res.json({ error: "Gagal ambil video" });

  } catch (err) {
    res.json({ error: "Error server" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server jalan");
});
