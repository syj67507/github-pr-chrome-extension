import React from "react";
import Box from "@mui/material/Box";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { createTab } from "../../../../data/extension";

export default function RepoTitle({ repo }) {
  return (
    <Tooltip
      title={`${repo.pullRequests.length} open`}
      followCursor
      disableInteractive
    >
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
            onClick={() => {
              createTab(repo.url);
            }}
          >
            <OpenInNewIcon
              sx={{
                fontSize: 16,
                color: "rgba(119, 119, 119, 0.25)",
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
    </Tooltip>
  );
}
