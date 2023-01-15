import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTab } from "../../../../data/extension";

export default function NoPullRequest({ repo }) {
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
        createTab(`${repo.url}/pulls`);
      }}
    >
      <Typography variant="caption">No pull requests open</Typography>
    </Box>
  );
}
