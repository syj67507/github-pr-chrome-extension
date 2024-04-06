import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import JiraIconButton from "./JiraIconButton";
import GitHubIconButton from "./GitHubIconButton";
import type { PullRequestData, RepoData } from "../../../../../data";

interface PullRequestProps {
  pr: PullRequestData;
  repo: RepoData;
}

export default function PullRequest({ pr, repo }: PullRequestProps) {
  console.log(repo);
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
      color={pr.draft ? "#AAA" : "black"}
    >
      <GitHubIconButton pr={pr} />
      {repo.isJiraConfigured && <JiraIconButton jiraUrl={pr.jiraUrl} />}
      <Stack overflow="hidden">
        <Typography variant="caption" fontStyle="italic">
          {pr.username}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {pr.draft && "DRAFT - "}
          {pr.title}
        </Typography>
      </Stack>
    </Stack>
  );
}
