import React from "react";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack"
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography"
import GitHubIcon from "@mui/icons-material/GitHub";
import JiraIconButton from "./JiraIconButton";
import GitHubIconButton from "./GitHubIconButton";


export default function PullRequest({ pr }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      width="100%"
      sx={{
        "&:hover": { bgcolor: "whitesmoke" },
      }}
      padding={1}
    >
      <GitHubIconButton pr={pr} />
      <JiraIconButton jiraUrl={pr.jiraUrl} />
      <Typography variant="caption" sx={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
      }}>
        {pr.title}
      </Typography>
    </Stack>
  );
}
