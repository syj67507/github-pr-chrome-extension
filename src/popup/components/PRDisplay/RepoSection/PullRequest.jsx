import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import GitHubIcon from "@mui/icons-material/GitHub";

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
      <Button
        variant="contained"
        startIcon={<GitHubIcon />}
        sx={{
          color: "white",
          bgcolor: "black",
          "&:hover": {
            bgcolor: "#666666",
          },
          paddingX: 1,
          paddingY: 0,
        }}
        onClick={() => {
          chrome.tabs.create({
            url: pr.url,
          });
        }}
      >
        #{pr.number}
      </Button>
      <Button
        variant="contained"
        disabled={pr.jiraUrl === undefined}
        sx={{
          color: "white",
          bgcolor: "green",
          "&:hover": {
            bgcolor: "darkgreen",
          },
          paddingX: 1,
          paddingY: 0,
        }}
        onClick={() => {
          if (pr.jiraUrl !== undefined) {
            chrome.tabs.create({
              url: pr.jiraUrl,
            });
          }
        }}
      >
        JIRA
      </Button>
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
