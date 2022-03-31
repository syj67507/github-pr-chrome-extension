/* global chrome */
import React from "react";
import { Button, Stack, Typography } from "@mui/material";

export default function index({ repo, setSavedRepos }) {
  return (
    <Stack direction="row" spacing={2} alignItems="baseline">
      <Button
        sx={{
          backgroundColor: "red",
          borderRadius: 100,
          "&:hover": {
            backgroundColor: "darkred",
          },
        }}
        variant="contained"
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
        X
      </Button>
      <Typography variant="subtitle1">{repo.user}/{repo.name}</Typography>
    </Stack>
  );
}
