import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import PullRequest from "./PullRequest";
import RepoTitle from "./RepoTitle";
import NoPullRequest from "./NoPullRequest";

export default function RepoSection({ repo }) {
  return (
    <Box>
      <RepoTitle repo={repo} />
      <Stack width="100%" spacing={0}>
        {repo.pullRequests &&
          repo.pullRequests.length > 0 &&
          repo.pullRequests.map((pullRequest) => (
            <PullRequest key={repo.url} pr={pullRequest} />
          ))}
        {repo.pullRequests && repo.pullRequests.length <= 0 && (
          <NoPullRequest repo={repo} />
        )}
      </Stack>
    </Box>
  );
}
