const express = require("express"); // expressモジュールを読み込む
const mongoose = require("mongoose");
const CryptoJs = require("crypto-js");
const User = require("./src/v1/models/user");
const JWT = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const app = express(); // expressモジュールをインスタンス化してapp変数に代入
const PORT = 5000;
require("dotenv").config();

app.use(express.json()); // jsonオブジェクトを認識させる

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

// ユーザー新規登録API
app.post(
  "/register",
  body("username")
    .isLength({ min: 8 })
    .withMessage("ユーザー名は８文字以上である必要がある"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("パスワードはは８文字以上である必要がある"),
  body("confirmPassword")
    .isLength({ min: 8 })
    .withMessage("確認用パスワードはは８文字以上である必要がある"),
  body("username").custom((value) => {
    return User.findOne({ username: value }).then((user) => {
      if (user) {
        return Promise.reject("このユーザーはすでに使われています");
      }
    });
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  async (req, res) => {
    // パスワードの受け取り
    const password = req.body.password;

    try {
      // パスワードの暗号化
      req.body.password = CryptoJs.AES.encrypt(
        password,
        process.env.SECRET_KEY
      );
      // ユーザーの新規作成
      const user = await User.create(req.body);
      console.log("user", user);
      // JWTの発行
      const token = JWT.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
        expiresIn: "24h",
      });
      return res.status(200).json({ user, token });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
);
