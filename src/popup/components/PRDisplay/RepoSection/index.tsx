import React, { useState } from "react";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import RepoHeader from "./RepoHeader";
import { type RepoData } from "../../../../data";

interface RepoSectionProps extends React.PropsWithChildren {
  /** The data of the repo to show for this section */
  repo: RepoData;
}

export default function RepoSection({ repo, children }: RepoSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "1px 1px 3px black",
        borderRadius: 2,
        bgcolor: "white",
      }}
    >
      <Stack
        width="100%"
        display="flex"
        flexDirection="row"
        alignItems="center"
        bgcolor="#222"
        color="whitesmoke"
        sx={{
          borderRadius: "inherit", // makes sure the corners aren't overriden back to right angles
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
      <Stack width="100%">
        <Collapse in={isOpen} timeout={500}>
          <Stack width="100%" spacing={0}>
            {/* Children here are intended to be the pull request components */}
            {children}
          </Stack>
        </Collapse>
      </Stack>
    </Box>
  );
}
