import React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import RepoSection from "./RepoSection";
import Loading from "../Loading";
import "regenerator-runtime";
import PullRequest from "./RepoSection/PullRequest";
import NoPullRequest from "./RepoSection/NoPullRequest";
import FilterOptions from "./Filters/Filters";
import Card from "../Card/Card";
import {
  useGetAnimatedExpandSetting,
  useGetHeaderClickBehavior,
  useGetPullRequests,
  useGetStatusChecksSetting,
  useSavedFilters,
} from "../../hooks";

export default function PRDisplay() {
  const { loadingFilters, filters, setFilters } = useSavedFilters();
  const { loading, data, username, token } = useGetPullRequests();
  const [headerClickBehavior] = useGetHeaderClickBehavior();
  const [animatedExpandSetting] = useGetAnimatedExpandSetting();
  const [statusChecksSetting] = useGetStatusChecksSetting();

  return (
    <Stack width="100%" bgcolor="whitesmoke" padding={1} spacing={1}>
      {/* Filtering search box */}
      {loadingFilters && <Loading />}
      {!loadingFilters && (
        <FilterOptions filters={filters} setFilters={setFilters} />
      )}
      {loading && <Loading />}
      {/* TODO error message when fetching */}
      <Stack width="100%" spacing={1}>
        {token === undefined && (
          <Card
            sx={{
              bgcolor: "#e5f6fd",
            }}
          >
            <Alert
              severity="info"
              sx={{
                paddingX: 1,
                paddingY: 0,
              }}
            >
              You haven&apos;t set your classic personal access token yet. Go to
              settings and save your token so that you can see all your pull
              requests!
            </Alert>
          </Card>
        )}
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
              <RepoSection
                key={repo.url}
                repo={repo}
                headerClickBehavior={headerClickBehavior}
                animatedExpandSetting={animatedExpandSetting}
              >
                {filtered.length > 0
                  ? filtered.map((pr) => (
                      <PullRequest
                        key={pr.url}
                        pr={pr}
                        isJiraConfigured={repo.isJiraConfigured}
                        statusChecksSetting={statusChecksSetting}
                      />
                    ))
                  : filtered.length === 0 && <NoPullRequest url={repo.url} />}
              </RepoSection>
            );
          })}
        {data != null && data.length === 0 && (
          <Card
            sx={{
              bgcolor: "#e5f6fd",
            }}
          >
            <Alert
              severity="info"
              sx={{
                paddingX: 1,
                paddingY: 0,
              }}
            >
              You haven&apos;t configured any repositories yet. Configure a
              repository under the Repos menu to start viewing pull requests for
              your favorite repositories!
            </Alert>
          </Card>
        )}
      </Stack>
    </Stack>
  );
}
