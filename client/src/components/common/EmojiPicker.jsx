import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Picker from "@emoji-mart/react";

const EmojiPicker = ({ icon }) => {
  const [selectedEmoji, setSelectedEmoji] = useState();
  const [isShowPicker, setIsShowPicker] = useState(false);
  useEffect(() => {
    setSelectedEmoji(icon);
  }, [icon]);

  const showPicker = () => setIsShowPicker(!isShowPicker);
  const selectEmoji = (e) => {
    const emojiCode = e.unified.split("-");
    let codesArray = [];
    emojiCode.forEach((element) => codesArray.push("0x" + element));
    const emoji = String.fromCodePoint(...codesArray);
    setIsShowPicker(false);
  };
  return (
    <Box>
      <Typography
        variant="h3"
        fontWeight={700}
        sx={{ cursor: "pointer" }}
        color="initial"
        onClick={showPicker}
      >
        {icon}
      </Typography>
      <Box
        sx={{
          display: isShowPicker ? "blodk" : "none",
          position: "absolute",
          zIndex: 100,
        }}
      >
        <Picker onEmojiSelect={selectEmoji} />
      </Box>
    </Box>
  );
};

export default EmojiPicker;
