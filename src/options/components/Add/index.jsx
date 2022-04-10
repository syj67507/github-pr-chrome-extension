/* global chrome */
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function Add({ setSavedRepos }) {
  const [repository, setRepository] = useState("");
  const [jiraTag, setJiraTag] = useState("");

  return (
    <Stack padding={2} spacing={2} width="50%" direction="column" alignItems="center" justifyContent="center">
      <TextField
        label="Repository URL"
        helperText="https://github.com/<username>/<repositoryName>"
        variant="standard"
        value={repository}
        onChange={(e) => {
          setRepository(e.target.value);
        }}
        fullWidth
      />
      <TextField
        label="JIRA Tag (optional)"
        helperText="'TAG' as in TAG-1234"
        variant="standard"
        value={jiraTag}
        onChange={(e) => {
          setJiraTag(e.target.value);
        }}
        fullWidth
      />
      <Stack width="100%" direction="row" justifyContent="flex-end" spacing={2}>
        <Button
          variant="contained"
          color="error"
          onClick={async () => {
            setRepository("");
            setJiraTag("");
          }}
        >
          Clear
        </Button>
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
      </Stack>
    </Stack>
  );
}
