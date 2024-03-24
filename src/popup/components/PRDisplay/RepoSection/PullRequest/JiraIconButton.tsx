import React from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import JiraIcon from "./jira-icon.svg";
import DisabledJiraIcon from "./jira-icon-disabled.svg";
import { createTab } from "../../../../../data/extension";
import { type PullRequestData } from "../../../../../data";

interface JiraIconButtonProps {
  /** The URL to the Jira Ticket */
  jiraUrl: PullRequestData["jiraUrl"];
}

function EnabledJiraIconButton({ jiraUrl }: JiraIconButtonProps) {
  return (
    <Tooltip title={jiraUrl ?? ""} placement="top">
      <IconButton
        sx={{
          border: "2px solid #2684ff",
        }}
        onClick={() => {
          if (jiraUrl !== undefined) {
            createTab(jiraUrl).catch(() => {
              console.error(`Failed to create a tab with url ${jiraUrl}`);
            });
          }
        }}
        size="small"
      >
        <JiraIcon />
      </IconButton>
    </Tooltip>
  );
}

function DisabledJiraIconButton() {
  return (
    <IconButton
      disabled
      sx={{
        border: "2px solid #ddd",
      }}
      size="small"
    >
      <DisabledJiraIcon />
    </IconButton>
  );
}

export default function JiraIconButton({ jiraUrl }: JiraIconButtonProps) {
  if (jiraUrl !== undefined) {
    return <EnabledJiraIconButton jiraUrl={jiraUrl} />;
  }

  return <DisabledJiraIconButton />;
}
