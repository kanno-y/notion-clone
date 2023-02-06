const express = require("express"); // expressモジュールを読み込む
const app = express(); // expressモジュールをインスタンス化してapp変数に代入
const PORT = 5000;

// HTTP GET 要求を指定されたパス("/")にルーティング
app.get("/", (req, res) => {
  res.send("Hello World");
});

// サーバーを始動して、ポート 6000 で接続をlistenする
app.listen(PORT, () => {
  console.log("ローカルサーバー起動中・・・");
});
