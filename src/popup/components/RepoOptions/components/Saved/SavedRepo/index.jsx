import React from "react";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
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
        {repo.jiraTags && (
          <Typography variant="caption">{repo.jiraTags.join(",")}</Typography>
        )}
      </Stack>

      {/* Delete icon button */}
      <IconButton aria-label="delete" onClick={onRemove} padding={0}>
        <CloseIcon />
      </IconButton>
    </Stack>
  );
}
