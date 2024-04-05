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
import Card from "../Card/Card";

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
    <Stack width="100%" bgcolor="whitesmoke" padding={1} spacing={1}>
      {/* Filtering search box */}
      <Filters filters={filters} setFilters={setFilters} />
      {loading && <Loading />}
      {/* TODO error message when fetching */}
      <Stack width="100%" spacing={1}>
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
          <Card>
            <Typography variant="body2" textAlign="left">
              Configure a repository under the Repos menu to start viewing pull
              requests for your favorite repositories!
            </Typography>
          </Card>
        )}
      </Stack>
    </Stack>
  );
}
