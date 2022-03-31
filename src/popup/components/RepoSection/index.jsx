/* global chrome */
import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import PullRequest from "./PullRequest";
import RepoTitle from "./RepoTitle";
import NoPullRequest from "./NoPullRequest";

export default function RepoSection({ repo, pullRequests }) {
  return (
    <Box>
      <RepoTitle repo={repo} />
      <Stack width="100%" spacing={0}>
        { 
          pullRequests &&
          pullRequests.length > 0 &&
          pullRequests.map((pullRequest, index) => (
            <PullRequest key={index} pr={pullRequest} jiraTag={repo.jiraTag} />
          ))
        }
        {
          pullRequests && pullRequests.length <= 0 && <NoPullRequest />
        }
      </Stack>
    </Box>
  );
}
