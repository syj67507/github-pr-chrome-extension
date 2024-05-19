import React from "react";
import CircleIcon from "@mui/icons-material/Circle";
import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";
import Tooltip from "@mui/material/Tooltip";

export function PendingStatusChecksIcon() {
  return (
    <Tooltip
      title="Checks are still in rrogress"
      placement="top"
      disableInteractive
    >
      <CircleIcon
        sx={{
          color: "#DCAB08",
          fontSize: "10px",
        }}
      />
    </Tooltip>
  );
}

export function SuccessStatusChecksIcon() {
  return (
    <Tooltip title="All checks passed" placement="top" disableInteractive>
      <DoneIcon
        sx={{
          color: "#1f883d",
          fontSize: "16px",
        }}
      />
    </Tooltip>
  );
}

export function FailedStatusChecksIcon() {
  return (
    <Tooltip title="Checks have failed" placement="top" disableInteractive>
      <ClearIcon
        sx={{
          color: "red",
          fontSize: "16px",
        }}
      />
    </Tooltip>
  );
}
