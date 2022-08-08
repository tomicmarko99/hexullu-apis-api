const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const PORT = process.env.PORT || 8000;

const app = express();

var cors = require("cors");
app.use(cors());

const hexullu = [];
const interval = setInterval(() => {
  axios
    .get("https://rapidapi.com/user/hexulluapis")
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      $(".vueperslide--visible", html).each(function () {
        const title = $(this).find(".ApiName").text();
        const description = $(this).find(".CardContent", "p").text();
        const img = $(this).find(".b-avatar-img img").attr("src");
        const url = `https://rapidapi.com` + $(this).find(".CardLink").attr("href");
        hexullu.push({
          title,
          description,
          img,
          url,
        });
      });

      // res.json(hexullu);
    })
    .catch((err) => {
      console.log(err);
    });
  clearArr(hexullu);
}, 10000);

const clearArr = (hexullu) => {
  while (hexullu.length > 0) {
    hexullu.pop();
  }
};

app.get("/", (req, res) => {
  res.json("Welcome to Hexullu Rapid API");
});

app.get("/hexullu", (req, res) => {
  res.json(hexullu);
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
