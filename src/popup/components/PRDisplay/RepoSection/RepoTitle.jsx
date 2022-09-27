/* global chrome */
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function RepoTitle({ repo }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        borderBottom: "1px solid whitesmoke",
        width: "100%",
        "&:hover": {
          cursor: "pointer",
          bgcolor: "whitesmoke",
        },
        padding: 1, 
      }}
      onClick={() => {
        chrome.tabs.create({
          url: repo.url,
        });
      }}
    >
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          {`${repo.owner}/${repo.name}`}
        </Typography>
    </Box>
  );
}