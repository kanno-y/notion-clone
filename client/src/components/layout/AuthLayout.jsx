import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/system";
import { Box } from "@mui/material";
import notionLogo from "../../assets/images/notion-logo.png";

const AuthLayout = () => (
  <div>
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          src={notionLogo}
          alt=""
          style={{ width: 100, height: 100, marginBottom: 3 }}
        />
        Notionクローン
      </Box>
      <Outlet />
    </Container>
  </div>
);

export default AuthLayout;
