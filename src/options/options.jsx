import regeneratorRuntime from "regenerator-runtime";
import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { Stack, Typography } from "@mui/material";
import { AddRepo } from "./components/AddRepo";
import SavedRepo from "./components/SavedRepo";

function Options() {
  const [savedRepos, setSavedRepos] = useState([]);

  useEffect(async () => {
    const storage = await chrome.storage.sync.get();
    let savedRepos = storage.savedRepos;
    if (savedRepos === undefined) {
      console.log("Initializing saved repos...");
      savedRepos = [];
    }
    setSavedRepos(savedRepos);
  }, []);

  console.log("OPTIONS", savedRepos);

  return (
    <Stack spacing={4} alignItems="center">
      <AddRepo setSavedRepos={setSavedRepos} />
      <Typography variant="h4">Currently Saved Repos</Typography>
      {savedRepos.map((repo, index) => (
        <SavedRepo key={index} repo={repo} setSavedRepos={setSavedRepos} />
      ))}
    </Stack>
  );
}

render(<Options />, document.getElementById("root"));
