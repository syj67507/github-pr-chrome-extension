import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTab } from "../../../../data/extension";

interface NoPullRequestProps {
  /** The url of the repo for this display component */
  url: string;
}

export default function NoPullRequest({ url }: NoPullRequestProps) {
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
        createTab(`${url}/pulls`).catch(() => {
          console.error(`failed to create tab with url: ${url}/pulls`);
        });
      }}
    >
      <Typography variant="caption">No pull requests open</Typography>
    </Box>
  );
}
