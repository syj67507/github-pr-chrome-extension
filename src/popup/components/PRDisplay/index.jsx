/** global chrome */
import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import GitHubClient from "../../../data";
import RepoSection from "./RepoSection";
import Loading from "../Loading";
import { getToken, getRepositories } from "../../../data/chromeStorage";
import "regenerator-runtime";

export default function Popup() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(false); // TODO display error
  const [filter, setFilter] = useState("");

  // On popup load, we need to fetch all the PRs
  useEffect(() => {
    async function getPRs() {
      try {
        setLoading(true);

        const token = await getToken();
        const client = new GitHubClient(token);

        const repos = await getRepositories();
        const reposData = await client.getRepoData(repos);

        setData(reposData);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setLoading(false);
        setData(null);
      }
    }
    getPRs();
  }, []);

  return (
    <Stack width="100%">
      {loading && <Loading />}
      {/* TODO error message when fetching */}

      {/* Filtering search box */}
      {data && data.length > 0 && (
        <TextField
          variant="standard"
          placeholder="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          inputProps={{
            style: { textAlign: "center" },
          }}
        />
      )}

      {data &&
        data.length > 0 &&
        data.map((repo) => {
          return <RepoSection key={repo.url} repo={repo} filter={filter} />;
        })}
      {/* TODO Nothing to show when data.length === 0 */}
    </Stack>
  );
}
