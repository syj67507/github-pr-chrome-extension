/* global chrome */
import React from "react";
import { Box, Typography } from "@mui/material";

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
        }}
        onClick={() => {
          chrome.tabs.create({
            url: repo.url,
          });
        }}
      >
        <Typography variant="subtitle1" sx={{ padding: 1, fontWeight: "bold" }}>
          {`${repo.user}/${repo.name}`}
        </Typography>
      </Box>
    );
}