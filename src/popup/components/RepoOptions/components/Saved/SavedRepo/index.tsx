import React from "react";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { type StorageRepo } from "../../../../../../data/extension";

export interface SavedRepoProps {
  /** The repo of the saved repo */
  repo: StorageRepo;
  /** Handler for when the remove button is clicked */
  onRemove: (repo: StorageRepo) => Promise<void>;
  /** The background color for the saved repo */
  bgcolor: string;
}

export default function SavedRepo({ repo, onRemove, bgcolor }: SavedRepoProps) {
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
        {repo.jiraTags != null && (
          <Typography variant="caption">{repo.jiraTags.join(",")}</Typography>
        )}
        {repo.jiraDomain != null && (
          <Typography variant="caption">{repo.jiraDomain}</Typography>
        )}
      </Stack>

      {/* Delete icon button */}
      <IconButton
        aria-label="delete"
        onClick={() => {
          onRemove(repo).catch((e) => {
            console.error("failed to remove repo", repo, e);
          });
        }}
      >
        <CloseIcon />
      </IconButton>
    </Stack>
  );
}
