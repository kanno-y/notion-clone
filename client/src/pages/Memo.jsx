import React, { useEffect } from "react";
import { Box } from "@mui/system";
import { IconButton, TextField } from "@mui/material";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useParams } from "react-router-dom";
import memoApi from "../api/memoApi";

const Memo = () => {
  const { id } = useParams();
  console.log(IDBCursorWithValue);
  useEffect(() => {
    const getMemo = async () => {
      try {
        const res = await memoApi.getOne(id);
        console.log(res);
      } catch (error) {
        alert(error);
      }
    };
    getMemo();
  }, [id]);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <IconButton>
          <StarBorderOutlinedIcon />
        </IconButton>
        <IconButton variant="outlined" color="error">
          <DeleteOutlinedIcon />
        </IconButton>
      </Box>
      <Box sx={{ padding: "10px 50px" }}>
        <TextField
          placeholder="無題"
          variant="outlined"
          fullWidth
          sx={{
            ".MuiOutlinedInput-input": { padding: 0 },
            ".MuiOutlinedInput-notchedOutline": { border: "none" },
            ".MuiOutlinedInput-root": { fontSize: "2rem", fontWeight: "700" },
          }}
        />
        <TextField
          placeholder="追加"
          variant="outlined"
          fullWidth
          sx={{
            ".MuiOutlinedInput-input": { padding: 0 },
            ".MuiOutlinedInput-notchedOutline": { border: "none" },
            ".MuiOutlinedInput-root": { fontSize: "1rem" },
          }}
        />
      </Box>
    </>
  );
};

export default Memo;
