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
  /** The function to execute to expand the header */
  onExpand: React.MouseEventHandler<HTMLDivElement>;
}

export default function RepoHeader({ repo, onExpand }: RepoTitleProps) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        padding: 1,
      }}
    >
      <Tooltip
        title={`${repo.url}`}
        followCursor
        disableInteractive
        enterDelay={1000}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            gap: 1,
            overflow: "hidden",
            paddingX: 1,
          }}
          onClick={() => {
            createTab(repo.url).catch(() => {
              console.error(`failed to create tab with url: ${repo.url}`);
            });
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: "bold",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {repo.name}
          </Typography>
        </Box>
      </Tooltip>
      <Tooltip
        title={`${repo.pullRequests.length} open`}
        followCursor
        disableInteractive
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
          onClick={(e) => {
            onExpand(e);
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
                color: "white",
                "&:hover": {
                  color: "white",
                },
                "&:active": {
                  color: "white",
                },
              }}
            />
          </IconButton>
        </Box>
      </Tooltip>
    </Box>
  );
}
