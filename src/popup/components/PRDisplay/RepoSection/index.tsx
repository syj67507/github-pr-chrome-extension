import React, { useState } from "react";
import Collapse from "@mui/material/Collapse";
import Stack from "@mui/material/Stack";
import RepoHeader from "./RepoHeader";
import { type RepoData } from "../../../../data";
import Card from "../../Card/Card";

interface RepoSectionProps extends React.PropsWithChildren {
  /** The data of the repo to show for this section */
  repo: RepoData;
}

export default function RepoSection({ repo, children }: RepoSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card
      sx={{
        padding: 0,
      }}
    >
      <Stack
        width="100%"
        display="flex"
        flexDirection="row"
        alignItems="center"
        color="whitesmoke"
        sx={{
          borderRadius: "inherit",
          bgcolor: "#222",
          "&:hover": {
            cursor: "pointer",
            bgcolor: "#101",
          },
        }}
      >
        <RepoHeader
          repo={repo}
          onOpen={() => {
            setIsOpen(!isOpen);
          }}
        />
      </Stack>
      <Stack width="100%" bgcolor="white" borderRadius="inherit">
        <Collapse in={isOpen} timeout={500}>
          <Stack width="100%" spacing={0}>
            {/* Children here are intended to be the pull request components */}
            {children}
          </Stack>
        </Collapse>
      </Stack>
    </Card>
  );
}
