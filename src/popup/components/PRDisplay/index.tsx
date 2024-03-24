import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import GitHubClient, { type RepoData } from "../../../data";
import RepoSection from "./RepoSection";
import Loading from "../Loading";
import { getToken, getRepositories, setBadge } from "../../../data/extension";
import "regenerator-runtime";
import PullRequest from "./RepoSection/PullRequest";
import NoPullRequest from "./RepoSection/NoPullRequest";
import Filters from "./Filters/Filters";

export default function PRDisplay() {
  const [username, setUsername] = useState("");
  const [data, setData] = useState<RepoData[] | null>(null);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(false); // TODO display error
  const [filters, setFilters] = useState({
    includeDrafts: true,
    showMine: false,
    textFilter: "",
  });

  // On popup load, we need to fetch all the PRs
  useEffect(() => {
    async function getPRs() {
      try {
        setLoading(true);

        const token = await getToken();
        const client = new GitHubClient(token);

        // Fetch data
        const storageRepos = await getRepositories();
        const userPromise = client.getAuthenticatedUser();
        const reposDataPromise = client.getRepoData(storageRepos);

        // Using promise all to make calls in parallel
        const [user, reposData] = await Promise.all([
          userPromise,
          reposDataPromise,
        ]);

        setUsername(user.username);
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
        setUsername("");
      }
    }
    getPRs().catch((e) => {
      console.error(`failed to getPRs()`, e);
    });
  }, []);

  return (
    <Stack width="100%">
      {/* Filtering search box */}
      <Filters filters={filters} setFilters={setFilters} />
      {loading && <Loading />}
      {/* TODO error message when fetching */}
      {data != null &&
        data.length > 0 &&
        data.map((repo) => {
          // Show only those pull requests that contain the text filter
          let filtered = repo.pullRequests.filter((pullRequest) => {
            return JSON.stringify(Object.values(pullRequest))
              .toLowerCase()
              .includes(filters.textFilter.toLowerCase());
          });

          // Show only the users pull requests if specified by the user
          if (filters.showMine && username !== "") {
            filtered = filtered.filter(
              (pullRequest) => pullRequest.username === username
            );
          }

          // Show draft pull requests if specified by the user
          if (!filters.includeDrafts) {
            filtered = filtered.filter((pullRequest) => !pullRequest.draft);
          }

          return (
            <RepoSection key={repo.url} repo={repo}>
              {filtered.length > 0
                ? filtered.map((pr) => <PullRequest key={pr.url} pr={pr} />)
                : filtered.length === 0 && <NoPullRequest url={repo.url} />}
            </RepoSection>
          );
        })}
      {data != null && data.length === 0 && (
        <Stack justifyContent="center" alignItems="center" padding={1}>
          <Typography variant="body2" textAlign="center">
            You don&apos;t have any repositories configured. Click on REPOS at
            the top to configure some.
          </Typography>
        </Stack>
      )}
    </Stack>
  );
}
