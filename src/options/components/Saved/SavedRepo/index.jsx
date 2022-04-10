/* global chrome */
import React from "react";
import { IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export default function SavedRepo({ repo, setSavedRepos }) {
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      width="100%"
    >
      <IconButton aria-label="delete"
        onClick={async () => {
          const storage = await chrome.storage.sync.get();
          const savedRepos = storage.savedRepos;
          const filtered = savedRepos.filter((savedRepo) => {
            return `${savedRepo.user}/${savedRepo.name}` !== `${repo.user}/${repo.name}` ;
          });
          chrome.storage.sync.set({
            savedRepos: filtered,
          });
          setSavedRepos(filtered);
        }}
      >
        <CloseIcon />
      </IconButton>
      <Typography variant="subtitle1">{repo.user}/{repo.name}</Typography>
    </Stack>
  );
}
