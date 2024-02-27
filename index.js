const express = require("express");
const cors = require("cors");
const googleMaps = require("@google/maps").createClient({
  key: "AIzaSyD5jeVi1FPrZz01GXkG9NGs3OhUMsunSlU", // ใส่ API Key ของคุณที่นี่
  Promise: Promise, // ใช้ Promise สำหรับการจัดการ asynchronous operations
});
const bodyParser = require("body-parser");
const app = express();
const { playGame } = require("./game/xogame");
const playGame24 = require("./game/game24");
app.use(cors()); // เปิดใช้งาน CORS สำหรับทุก request
const port = 8080;

app.use(express.json()); // ให้ Express ใช้งาน JSON middleware

app.get("/search", async (req, res) => {
  try {
    const { name } = req.query; // รับ parameter 'name' จาก query string
    const response = await googleMaps
      .places({
        query: name,
        language: "th",
      })
      .asPromise();

    res.json(response.json.results);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.use(bodyParser.json());
app.post("/api/play", playGame);
playGame24(app);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
