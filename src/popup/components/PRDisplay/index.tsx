import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import GitHubClient, { type RepoData } from "../../../data";
import RepoSection from "./RepoSection";
import Loading from "../Loading";
import { getToken, getRepositories, setBadge } from "../../../data/extension";
import "regenerator-runtime";
import PullRequest from "./RepoSection/PullRequest";
import NoPullRequest from "./RepoSection/NoPullRequest";

export default function PRDisplay() {
  const [data, setData] = useState<RepoData[] | null>(null);
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

        const storageRepos = await getRepositories();
        const reposData = await client.getRepoData(storageRepos);

        setData(reposData);
        setLoading(false);

        // Updates the browser action badge
        let count = 0;
        reposData.forEach((repoData) => {
          count += repoData.pullRequests.length;
        });
        setBadge(count).catch((e) => {
          console.error(`failed to set the badge to ${count}`, e);
        });
      } catch (e) {
        console.error(e);
        setLoading(false);
        setData(null);
      }
    }
    getPRs().catch((e) => {
      console.error(`failed to getPRs()`, e);
    });
  }, []);

  return (
    <Stack width="100%">
      {/* Filtering search box */}
      <TextField
        variant="standard"
        placeholder="filter"
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
        }}
        inputProps={{
          style: { textAlign: "center" },
        }}
      />

      {loading && <Loading />}
      {/* TODO error message when fetching */}

      {data != null &&
        data.length > 0 &&
        data.map((repo) => {
          const filtered = repo.pullRequests.filter((pullRequest) =>
            JSON.stringify(pullRequest)
              .toLowerCase()
              .includes(filter.toLowerCase())
          );
          return (
            <RepoSection key={repo.url} repo={repo}>
              {filtered.length > 0
                ? filtered.map((pr) => <PullRequest key={pr.url} pr={pr} />)
                : filtered.length === 0 && <NoPullRequest url={repo.url} />}
            </RepoSection>
          );
        })}
    </Stack>
  );
}
