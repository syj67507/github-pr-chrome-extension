import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import GitHubClient, { type RepoData } from "../../../data";
import RepoSection from "./RepoSection";
import Loading from "../Loading";
import {
  getToken,
  getRepositories,
  setBadge,
  saveFilterOptions,
  getSavedFilterOptions,
} from "../../../data/extension";
import "regenerator-runtime";
import PullRequest from "./RepoSection/PullRequest";
import NoPullRequest from "./RepoSection/NoPullRequest";
import Filters from "./Filters/Filters";
import Card from "../Card/Card";
import { useGetPullRequests, useSavedFilters } from "../../hooks";

export default function PRDisplay() {
  const { loadingFilters, filters, setFilters } = useSavedFilters();
  const { loading, data, username } = useGetPullRequests();

  return (
    <Stack width="100%" bgcolor="whitesmoke" padding={1} spacing={1}>
      {/* Filtering search box */}
      {loadingFilters && <Loading />}
      {!loadingFilters && <Filters filters={filters} setFilters={setFilters} />}
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
                  ? filtered.map((pr) => (
                      <PullRequest
                        key={pr.url}
                        pr={pr}
                        isJiraConfigured={repo.isJiraConfigured}
                      />
                    ))
                  : filtered.length === 0 && <NoPullRequest url={repo.url} />}
              </RepoSection>
            );
          })}
        {data != null && data.length === 0 && (
          <Card sx={{ bgcolor: "white" }}>
            <Typography variant="body1" textAlign="left">
              Configure a repository under the Repos menu to start viewing pull
              requests for your favorite repositories!
            </Typography>
          </Card>
        )}
      </Stack>
    </Stack>
  );
}
