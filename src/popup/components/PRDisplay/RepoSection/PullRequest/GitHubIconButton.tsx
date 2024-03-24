import React from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import GitHubIcon from "@mui/icons-material/GitHub";
import { createTab } from "../../../../../data/extension";
import type { PullRequestData } from "../../../../../data/index";

interface GitHubIconButtonProps {
  pr: PullRequestData;
}

export default function GitHubIconButton({ pr }: GitHubIconButtonProps) {
  return (
    <Tooltip title={`#${pr.number}`} placement="top">
      <IconButton
        sx={{
          color: "white",
          bgcolor: "black",
          "&:hover": {
            bgcolor: "#333",
          },
          border: "2px solid #000",
        }}
        onClick={() => {
          createTab(pr.url).catch(() => {
            console.error(`Failed to create tab with url ${pr.url}`);
          });
        }}
        size="small"
      >
        <GitHubIcon
          sx={{
            fontSize: 20,
          }}
        />
      </IconButton>
    </Tooltip>
  );
}
