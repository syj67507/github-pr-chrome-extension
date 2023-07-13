import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTab } from "../../../../data/extension";
import { type RepoData } from "../../../../data";

interface NoPullRequestProps {
  /** The data of the repo to show for this section */
  repo: RepoData;
}

export default function NoPullRequest({ repo }: NoPullRequestProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: 1,
        "&:hover": {
          bgcolor: "whitesmoke",
          cursor: "pointer",
        },
      }}
      onClick={() => {
        createTab(`${repo.url}/pulls`).catch(() => {
          console.error(`failed to create tab with url: ${repo.url}/pulls`);
        });
      }}
    >
      <Typography variant="caption">No pull requests open</Typography>
    </Box>
  );
}
