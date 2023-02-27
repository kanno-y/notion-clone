import {
  Box,
  Drawer,
  List,
  ListItemButton,
  Typography,
  IconButton,
} from "@mui/material";
import React from "react";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import assets from "../../assets/index.";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Drawer
      container={window.document.body}
      variant="permanent"
      open={true}
      sx={{ width: 250, height: "100vh" }}
    >
      <List
        sx={{
          width: 250,
          height: "100vh",
          backgroundColor: assets.colors.secondary,
        }}
      >
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight="700">
              {user.username}
            </Typography>
            <IconButton aria-label="" onClick={logout}>
              <LogoutOutlinedIcon />
            </IconButton>
          </Box>
        </ListItemButton>
        <Box sx={{ paddingTop: "10px" }}></Box>
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight="700">
              お気に入り
            </Typography>
          </Box>
        </ListItemButton>
        <Box sx={{ paddingTop: "10px" }}></Box>
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight="700">
              プライベート
            </Typography>
            <IconButton aria-label="" onClick={() => {}}>
              <AddBoxOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </ListItemButton>
        <ListItemButton sx={{ pl: "20px" }} component={Link} to="/memo/feafewa">
          <Typography variant="body2" fontWeight="700">
            📝仮置きのメモ
          </Typography>
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;
