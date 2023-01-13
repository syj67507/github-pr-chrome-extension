import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import PullRequest from "./PullRequest";
import RepoTitle from "./RepoTitle";
import NoPullRequest from "./NoPullRequest";

export default function RepoSection({ repo, filter }) {
  const { pullRequests } = repo;
  const prsToShow = pullRequests.filter((pullRequest) =>
    JSON.stringify(pullRequest).toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Box>
      <RepoTitle repo={repo} />
      <Stack width="100%" spacing={0}>
        {prsToShow &&
          prsToShow.length > 0 &&
          prsToShow.map((pullRequest) => (
            <PullRequest key={pullRequest.url} pr={pullRequest} />
          ))}
        {prsToShow && prsToShow.length <= 0 && <NoPullRequest repo={repo} />}
      </Stack>
    </Box>
  );
}
