import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import RepoHeader from "./RepoHeader";
import { type RepoData } from "../../../../data";

interface RepoSectionProps extends React.PropsWithChildren {
  /** The data of the repo to show for this section */
  repo: RepoData;
}

export default function RepoSection({ repo, children }: RepoSectionProps) {
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
            <RepoHeader repo={repo} />
          </Stack>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            margin: 0,
            padding: 0,
          }}
        >
          <Stack width="100%" spacing={0}>
            {/* Children here are intended to be the pull request components */}
            {children}
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
