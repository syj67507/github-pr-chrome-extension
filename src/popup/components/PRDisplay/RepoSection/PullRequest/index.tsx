import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DoneIcon from "@mui/icons-material/Done";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import Tooltip from "@mui/material/Tooltip";
import JiraIconButton from "./JiraIconButton";
import GitHubIconButton from "./GitHubIconButton";
import type { PullRequestData } from "../../../../../data";
import {
  ApprovedIcon,
  ChangesRequestedIcon,
  CommentedIcon,
} from "./ReviewIcons";

interface PullRequestProps {
  pr: PullRequestData;
  /**
   * Determines if Jira was configured by the user for the
   * repo that this pull request is associated with
   */
  isJiraConfigured: boolean;
}

export default function PullRequest({
  pr,
  isJiraConfigured,
}: PullRequestProps) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      flex={1}
      sx={{
        "&:hover": { bgcolor: "whitesmoke" },
      }}
      padding={1}
      color={pr.draft ? "#AAA" : "black"}
    >
      <GitHubIconButton pr={pr} />
      {isJiraConfigured && <JiraIconButton jiraUrl={pr.jiraUrl} />}
      <Stack overflow="hidden" flex={1}>
        <Typography variant="caption" fontStyle="italic">
          {pr.username}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {pr.draft && "DRAFT - "}
          {pr.title}
        </Typography>
      </Stack>

      {/* Icons to track if the user reviewed the pull request  */}
      {pr.viewerLatestReview !== null && (
        <Stack
          sx={{
            justifySelf: "flex-end",
          }}
        >
          {pr.viewerLatestReview === "APPROVED" && <ApprovedIcon />}
          {pr.viewerLatestReview === "CHANGES_REQUESTED" && (
            <ChangesRequestedIcon />
          )}
          {pr.viewerLatestReview === "COMMENTED" && <CommentedIcon />}
        </Stack>
      )}
    </Stack>
  );
}
