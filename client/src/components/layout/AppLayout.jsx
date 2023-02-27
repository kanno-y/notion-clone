import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Container } from "@mui/system";
import { Box } from "@mui/material";
import notionLogo from "../../assets/images/notion-logo.png";
import authUtils from "../../utils/authUtils";
import Sidebar from "../common/Sidebar";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/userSlice";

const AppLayout = () => {
  const navigate = useNavigate();
  const dispach = useDispatch();
  useEffect(() => {
    // JWTを持っているかを確認する
    const checkAuth = async () => {
      // 　認証チェック
      const user = await authUtils.isAuthenticated();
      if (!user) {
        navigate("/login");
      } else {
        // ユーザーを保存する
        dispach(setUser(user));
      }
    };
    checkAuth();
  }, [navigate]);
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, p: 1, width: "max-content" }}>
          <Outlet></Outlet>
        </Box>
      </Box>
    </div>
  );
};

export default AppLayout;
