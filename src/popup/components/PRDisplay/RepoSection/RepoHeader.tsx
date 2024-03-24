import React from "react";
import Box from "@mui/material/Box";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { createTab } from "../../../../data/extension";
import { type RepoData } from "../../../../data";

interface RepoTitleProps {
  /** The data of the repo to show for this section */
  repo: RepoData;
}

export default function RepoHeader({ repo }: RepoTitleProps) {
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
          createTab(repo.url).catch(() => {
            console.error(`failed to create tab with url: ${repo.url}`);
          });
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          {`${repo.owner}/${repo.name}`}
        </Typography>
      </Box>
      <Tooltip
        title={`${repo.pullRequests.length} open`}
        followCursor
        disableInteractive
      >
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
            <ExpandMoreIcon
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
      </Tooltip>
    </Box>
  );
}
