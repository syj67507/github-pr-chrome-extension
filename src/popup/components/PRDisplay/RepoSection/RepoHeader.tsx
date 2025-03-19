import React from "react";
import Box from "@mui/material/Box";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import {
  type HeaderClickBehavior,
  createTab,
} from "../../../../data/extension";
import { type RepoData } from "../../../../data";

interface RepoTitleProps {
  /** The data of the repo to show for this section */
  repo: RepoData;
  /** The function to execute when click the expand button */
  onExpand: React.MouseEventHandler;
  /** The user configured behavior when the blank space in the header is clicked */
  headerClickBehavior: HeaderClickBehavior;
}

export default function RepoHeader({
  repo,
  onExpand,
  headerClickBehavior,
}: RepoTitleProps) {
  let extraHeaderSpaceFunction;
  let extraHeaderSpaceToolTip = ``;
  if (headerClickBehavior === "expand") {
    extraHeaderSpaceFunction = onExpand;
    extraHeaderSpaceToolTip = `${repo.pullRequests.length} open`;
  }
  if (headerClickBehavior === "link") {
    extraHeaderSpaceFunction = () => {
      createTab(repo.url).catch(() => {
        console.error(`failed to create tab with url: ${repo.url}`);
      });
    };
    extraHeaderSpaceToolTip = `${repo.url}`;
  }

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        padding: 1,
        alignItems: "center"
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
              flex: 1,
              minWidth: 0,
            }}
          >
            {repo.name}
          </Typography>
        </Box>
      </Tooltip>
      <Tooltip title={extraHeaderSpaceToolTip} followCursor disableInteractive>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            flex: 1,
          }}
          onClick={extraHeaderSpaceFunction}
        >
          {repo.pullRequests.length > 0 && (
            <Box
              sx={{
                backgroundColor: "#2076d2",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "2em",
                height: "2em",
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: "white", fontWeight: "bold" }}
              >
                {repo.pullRequests.length}
              </Typography>
            </Box>
          )}
        </Box>
      </Tooltip>
      <Tooltip
        title={`${repo.pullRequests.length} open`}
        followCursor
        disableInteractive
      >
        <Box sx={{ flex: 0 }}>
          <IconButton
            onClick={(e) => {
              onExpand(e);
            }}
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
