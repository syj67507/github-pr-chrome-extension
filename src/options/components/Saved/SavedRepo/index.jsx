import React from "react";
import { IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function SavedRepo({ repo, onRemove, bgcolor }) {
  return (
    <Stack
      direction="column"
      padding={1}
      alignItems="flex-start"
      width="100%"
      bgcolor={bgcolor}
    >
      <Stack
        direction="row"
        alignItems="center"
        width="100%"
        justifyContent="space-between"
      >
        <Typography variant="caption">{repo.url}</Typography>
        <IconButton aria-label="delete" onClick={onRemove} padding={0}>
          <CloseIcon />
        </IconButton>
      </Stack>
      {repo.jiraDomain && (
        <Typography variant="caption">{repo.jiraDomain}</Typography>
      )}
      {repo.jiraTag && (
        <Typography variant="caption">{repo.jiraTag}</Typography>
      )}
    </Stack>
  );
}
