import React from "react";
import DoneIcon from "@mui/icons-material/Done";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import Tooltip from "@mui/material/Tooltip";

export function ApprovedIcon() {
  return (
    <Tooltip
      title="You have approved this pull request"
      placement="top"
      disableInteractive
    >
      <DoneIcon
        fontSize="small"
        sx={{
          color: "#1f883d",
        }}
      />
    </Tooltip>
  );
}

export function ChangesRequestedIcon() {
  return (
    <Tooltip
      title="You have requested changes on this pull request"
      placement="top"
      disableInteractive
    >
      <FeedbackOutlinedIcon
        fontSize="small"
        sx={{
          color: "red",
        }}
      />
    </Tooltip>
  );
}

export function CommentedIcon() {
  return (
    <Tooltip
      title="You have left comments on this pull request"
      placement="top"
      disableInteractive
    >
      <ChatBubbleOutlineOutlinedIcon
        fontSize="small"
        sx={{
          color: "#767676",
        }}
      />
    </Tooltip>
  );
}
