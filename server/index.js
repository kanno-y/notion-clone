const express = require("express"); // expressモジュールを読み込む
const mongoose = require("mongoose");
const app = express(); // expressモジュールをインスタンス化してapp変数に代入
const PORT = 5000;
require("dotenv").config();
const cors = require("cors");

// アクセスを許可するオリジンを設定
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json()); // jsonオブジェクトを認識させる
app.use("/api/v1", require("./src/v1/routes"));

// DB接続
try {
  mongoose.connect(process.env.MONGODB_URL);
  console.log("DBと接続中・・・");
} catch (error) {
  console.log(error);
}

// HTTP GET 要求を指定されたパス("/")にルーティング
app.get("/", (req, res) => {
  res.send("Hello World");
});

// サーバーを始動して、ポート 5000 で接続をlistenする
app.listen(PORT, () => {
  console.log("ローカルサーバー起動中・・・");
});
