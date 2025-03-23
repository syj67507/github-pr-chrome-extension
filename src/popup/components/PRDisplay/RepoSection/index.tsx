import React, { useState } from "react";
import Collapse from "@mui/material/Collapse";
import Stack from "@mui/material/Stack";
import RepoHeader from "./RepoHeader";
import { type RepoData } from "../../../../data";
import Card from "../../Card/Card";
import { type HeaderClickBehavior } from "../../../../data/extension";

interface RepoSectionProps extends React.PropsWithChildren {
  /** The data of the repo to show for this section */
  repo: RepoData;
  headerClickBehavior: HeaderClickBehavior;
  animatedExpandSetting: boolean;
  /** The user's configured setting for the repo header badge */
  repoHeaderBadgeSetting: boolean;
}

export default function RepoSection({
  repo,
  children,
  headerClickBehavior,
  animatedExpandSetting,
  repoHeaderBadgeSetting,
}: RepoSectionProps) {
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
          onExpand={() => {
            setIsOpen(!isOpen);
          }}
          headerClickBehavior={headerClickBehavior}
          repoHeaderBadgeSetting={repoHeaderBadgeSetting}
        />
      </Stack>
      <Stack width="100%" bgcolor="white" borderRadius="inherit">
        {animatedExpandSetting && (
          <Collapse in={isOpen} timeout={500}>
            <Stack width="100%" spacing={0}>
              {/* Children here are intended to be the pull request components */}
              {children}
            </Stack>
          </Collapse>
        )}
        {!animatedExpandSetting && (
          <Stack width="100%" spacing={0}>
            {/* Children here are intended to be the pull request components */}
            {isOpen && children}
          </Stack>
        )}
      </Stack>
    </Card>
  );
}
