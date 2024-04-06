import "regenerator-runtime";
import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Add from "./components/Add";
import Saved from "./components/Saved";
import {
  type ConfiguredRepo,
  addRepository,
  getRepositories,
  getStorage,
  removeRepository,
} from "../../../data/extension";
import Card from "../Card/Card";

export default function Repos() {
  const [repos, setRepos] = useState<ConfiguredRepo[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch repos on page load
  useEffect(() => {
    async function getRepos() {
      setLoading(true);
      const storage = await getStorage();
      setRepos(storage.repos ?? []);
      setLoading(false);
    }
    getRepos().catch((e) => {
      console.error(e);
      setError(true);
    });
  }, []);

  return (
    <Stack
      sx={{
        bgcolor: "whitesmoke",
        padding: 1,
      }}
      spacing={1}
    >
      <Card
        sx={{
          padding: 2,
          bgcolor: "white",
        }}
      >
        <Add
          onSave={async (repo, jiraTags, jiraDomain) => {
            await addRepository(repo, jiraTags, jiraDomain);
            setRepos(await getRepositories());
            console.log(await getRepositories());
          }}
        />
      </Card>

      <Card
        sx={{
          padding: 2,
          bgcolor: "white",
        }}
      >
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
      </Card>
    </Stack>
  );
}
