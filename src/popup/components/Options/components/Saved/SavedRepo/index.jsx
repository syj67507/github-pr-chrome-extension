import React from "react";
import { IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function SavedRepo({ repo, onRemove, bgcolor }) {
  return (
    <Stack
      direction="row"
      padding={1}
      alignItems="center"
      width="100%"
      bgcolor={bgcolor}
    >
      {/* Saved information */}
      <Stack direction="column" alignItems="flex-start" width="100%">
        <Typography variant="caption">{repo.url}</Typography>
        {repo.jiraDomain && (
          <Typography variant="caption">{repo.jiraDomain}</Typography>
        )}
        {repo.jiraTag && (
          <Typography variant="caption">{repo.jiraTag}</Typography>
        )}
      </Stack>

      {/* Delete icon button */}
      <IconButton aria-label="delete" onClick={onRemove} padding={0}>
        <CloseIcon />
      </IconButton>
    </Stack>
  );
}
