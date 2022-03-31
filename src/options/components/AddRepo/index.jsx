/* global chrome */
import React, { useState } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";

export function AddRepo({ setSavedRepos }) {
  const [repository, setRepository] = useState("");
  const [jiraTag, setJiraTag] = useState("");

  return (
    <Stack spacing={2}>
      <Typography variant="h4">Add a new repository</Typography>
      <TextField
        label="Repository URL"
        helperText="https://github.com/<username>/<repositoryName>"
        variant="outlined"
        value={repository}
        onChange={(e) => {
          setRepository(e.target.value);
        }}

      />
      <TextField
        label="JIRA Tag (optional)"
        helperText="'TAG' as in TAG-1234"
        variant="outlined"
        value={jiraTag}
        onChange={(e) => {
          setJiraTag(e.target.value);
        }}
      />
      <Button
        variant="contained"
        disabled={!repository}
        onClick={async () => {
          const storage = await chrome.storage.sync.get();
          let savedRepos = storage.savedRepos;
          if (savedRepos === undefined) {
            console.log("Initializing saved repos...");
            savedRepos = [];
          }

          // Fetch data from input
          //https://github.com/syj67507/discord-bot
          const [,,,username, repoName] = repository.split("/");
          const repo = {
            user: username,
            name: repoName,
            url: repository,
            jiraTag: jiraTag ? jiraTag : undefined
          };

          const alreadyAdded = savedRepos.filter((savedRepo) => savedRepo.user === repo.user && savedRepo.name === repo.name).length > 0;
          if (alreadyAdded) {
            return; // Don't add if it is already there
          }

          savedRepos.push(repo);
          chrome.storage.sync.set({ savedRepos: savedRepos });
          setSavedRepos(savedRepos);
        }}
      >
        Save
      </Button>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "red",
          "&:hover": {
            backgroundColor: "darkred",
          },
        }}
        onClick={async () => {
          chrome.storage.sync.set({ savedRepos: [] });
          setSavedRepos([]);
        }}
      >
        Clear
      </Button>
    </Stack>
  );
}
