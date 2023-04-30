import "regenerator-runtime";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Add from "./components/Add";
import Saved from "./components/Saved";
import {
  addRepository,
  getRepositories,
  getStorage,
  removeRepository,
} from "../../../data/extension";

export default function Repos() {
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
    <Box>
      <Add
        onSave={async (repo, jiraTags, jiraDomain) => {
          await addRepository(repo, jiraTags, jiraDomain);
          setRepos(await getRepositories());
          console.log(await getRepositories());
        }}
      />
      <Saved
        repos={repos}
        loading={loading}
        error={error}
        onRemove={async (repo) => {
          console.log("onRemove", repo.url);
          await removeRepository(repo.url);
          setRepos(await getRepositories());
        }}
      />
    </Box>
  );
}
