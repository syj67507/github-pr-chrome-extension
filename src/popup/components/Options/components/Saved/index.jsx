import { CircularProgress, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getStorage, setStorage } from "../../../../../data/chromeStorage";
import SavedRepo from "./SavedRepo";

export default function Saved() {
  const [repos, setRepos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch repos on page load
  useEffect(() => {
    async function getRepos() {
      setLoading(true);
      const storage = await getStorage();
      setRepos(storage.repos || []);
      setLoading(false);
    }
    getRepos().catch((e) => {
      console.error(e);
      setError(true);
    });
  }, []);

  return (
    <Stack padding={2} width="100%" spacing={1}>
      {loading && (
        <Stack width="100%" alignItems="center">
          <CircularProgress />
        </Stack>
      )}
      {error && (
        <Typography variant="body1" textAlign="center">
          An error occurred.
        </Typography>
      )}
      {repos && repos.length === 0 && (
        <Typography variant="body1" textAlign="center">
          You do not have any repositories saved. Go to the Add tab to add a
          repo.
        </Typography>
      )}
      {repos && repos.length > 0 && (
        <Typography variant="body1" textAlign="center">
          Here is a list of your currently saved repositories. You can remove
          them here.
        </Typography>
      )}
      {repos &&
        repos.map((repo, index) => (
          <SavedRepo
            key={repo.url}
            repo={repo}
            bgcolor={index % 2 === 0 ? "whitesmoke" : "white"}
            onRemove={async () => {
              const storage = await getStorage();
              const savedRepos = storage.repos;
              const filtered = savedRepos.filter((savedRepo) => {
                return savedRepo.url !== repo.url;
              });
              storage.repos = filtered;
              await setStorage(storage);
              setRepos(filtered);
            }}
          />
        ))}
    </Stack>
  );
}
