import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import GitHubIcon from "@mui/icons-material/GitHub";

export default function PullRequest({ pr, jiraTag }) {
  console.log("jiraTag", jiraTag);
  // Used for JIRA button
  const ticketTagIndex = pr.title.indexOf(jiraTag);

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
        disabled={ticketTagIndex === -1}
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
          if (ticketTagIndex > -1) {
            const ticketId = pr.title.substring(ticketTagIndex, ticketTagIndex + 8);
            chrome.tabs.create({
              url: `https://jira.ncr.com/browse/${ticketId}`,
            });
          }
        }}
      >
        JIRA
      </Button>
      <Typography variant="caption">
        {pr.title.length > 30 ? `${pr.title.substring(0, 30)}...` : pr.title}
      </Typography>
    </Stack>
  );
}
