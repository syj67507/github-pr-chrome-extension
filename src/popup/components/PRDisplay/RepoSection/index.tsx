import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import PullRequest from "./PullRequest";
import RepoTitle from "./RepoTitle";
import NoPullRequest from "./NoPullRequest";
import { type RepoData } from "../../../../data";

interface RepoSectionProps {
  /** The data of the repo to show for this section */
  repo: RepoData;
  /** The string to filter what pull requests to show for this repo section */
  filter: string;
}

export default function RepoSection({ repo, filter }: RepoSectionProps) {
  const { pullRequests } = repo;
  const prsToShow = pullRequests.filter((pullRequest) =>
    JSON.stringify(pullRequest).toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Box>
      <Accordion elevation={0} disableGutters square>
        <AccordionSummary
          sx={{
            padding: 0,
            "& .MuiAccordionSummary-content": {
              margin: 0,
            },
          }}
        >
          <Stack
            width="100%"
            display="flex"
            flexDirection="row"
            alignItems="center"
            sx={{
              "&:hover": {
                cursor: "pointer",
                bgcolor: "whitesmoke",
              },
            }}
          >
            <RepoTitle repo={repo} />
          </Stack>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            margin: 0,
            padding: 0,
          }}
        >
          <Stack width="100%" spacing={0}>
            {prsToShow !== undefined &&
              prsToShow.length > 0 &&
              prsToShow.map((pullRequest) => (
                <PullRequest key={pullRequest.url} pr={pullRequest} />
              ))}
            {prsToShow !== undefined && prsToShow.length <= 0 && (
              <NoPullRequest repo={repo} />
            )}
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
