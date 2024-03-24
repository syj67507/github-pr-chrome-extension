import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import JiraIconButton from "./JiraIconButton";
import GitHubIconButton from "./GitHubIconButton";
import type { PullRequestData } from "../../../../../data";

interface PullRequestProps {
  pr: PullRequestData;
}

export default function PullRequest({ pr }: PullRequestProps) {
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
      bgcolor={pr.draft ? "red" : "white"}
    >
      <GitHubIconButton pr={pr} />
      <JiraIconButton jiraUrl={pr.jiraUrl} />
      <Stack overflow="hidden">
        <Typography variant="caption" fontStyle="italic">
          {pr.user}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {pr.title}
        </Typography>
      </Stack>
    </Stack>
  );
}
