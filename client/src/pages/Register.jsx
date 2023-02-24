import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";
import authApi from "../api/authApi";

export const Register = () => {
  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");
  const [confirmPasswordErrText, setConfirmPassowrdErrText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsernameErrText("");
    setPasswordErrText("");
    setConfirmPassowrdErrText("");

    // 入力欄の文字列を取得
    const data = new FormData(e.target);
    const username = data.get("username").trim();
    const password = data.get("password").trim();
    const confirmPassword = data.get("confirmPassword").trim();
    console.log("username", username);
    console.log("password", password);
    console.log("confirmPassword", confirmPassword);

    // バリデーションを設定
    let error = false;
    if (username === "") {
      error = true;
      setUsernameErrText("名前を入力してください");
    }
    if (password === "") {
      error = true;
      setPasswordErrText("パスワードを入力してください");
    }
    if (confirmPassword === "") {
      error = true;
      setConfirmPassowrdErrText("確認用パスワードを入力してください");
    }
    if (password !== confirmPassword) {
      error = true;
      setConfirmPassowrdErrText("パスワードと確認用パスワードが異なります");
    }

    if (error) return;

    // 新規登録APIを叩く
    try {
      const res = await authApi.register({
        username,
        password,
        confirmPassword,
      });
      await console.log(res);
      localStorage.setItem("token", res.token);
      console.log("新規登録に成功しました。");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          id="username"
          label="お名前"
          margin="normal"
          name="username"
          required
          helperText={usernameErrText}
        />
        <TextField
          fullWidth
          id="password"
          label="パスワード"
          margin="normal"
          type="password"
          name="password"
          required
          helperText={passwordErrText}
        />
        <TextField
          fullWidth
          id="confirmPassword"
          label="確認用パスワード"
          margin="normal"
          type="confirmPassword"
          name="confirmPassword"
          required
          helperText={confirmPasswordErrText}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          type="submit"
          loading={false}
          color="primary"
          variant="outlined"
        >
          アカウント作成
        </LoadingButton>
      </Box>
      <Button component={Link} to="/login">
        既にアカウントを持っていますか？ログイン
      </Button>
    </>
  );
};

export default Register;
