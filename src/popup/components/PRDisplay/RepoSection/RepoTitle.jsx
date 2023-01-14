/* global chrome */
import React from "react";
import Box from "@mui/material/Box";
import ExpandMore from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

export default function RepoTitle({ repo }) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        padding: 1,
        borderBottom: "1px solid whitesmoke",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flex: 1,
          justifyContent: "center",
          gap: 1,
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
      <Box
        sx={{
          flex: 0,
        }}
      >
        <IconButton
          sx={{
            "&:hover": {
              bgcolor: "transparent",
            },
          }}
        >
          <ExpandMore
            sx={{
              fontSize: 16,
              color: "rgba(119, 119, 119, 0.5)",
              "&:hover": {
                color: "rgba(119, 119, 119, 0.75)",
              },
              "&:active": {
                color: "rgba(119, 119, 119, 1)",
              },
            }}
          />
        </IconButton>
      </Box>
    </Box>
  );
}
