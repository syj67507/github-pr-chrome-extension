import React from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import JiraIcon from "./jira-icon.svg";
import DisabledJiraIcon from "./jira-icon-disabled.svg";

function EnabledJiraIconButton({ jiraUrl }) {
  return (
    <Tooltip title={jiraUrl} placement="top">
      <IconButton
        sx={{
          border: "2px solid #2684ff",
        }}
        onClick={() => {
          if (jiraUrl !== undefined) {
            chrome.tabs.create({
              url: jiraUrl,
            });
          }
        }}
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
    >
      <DisabledJiraIcon />
    </IconButton>
  );
}

export default function JiraIconButton({ jiraUrl }) {
  if (jiraUrl) {
    return <EnabledJiraIconButton jiraUrl={jiraUrl} />;
  }

  return <DisabledJiraIconButton />;
}
