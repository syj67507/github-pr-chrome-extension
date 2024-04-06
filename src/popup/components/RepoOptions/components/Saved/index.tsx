import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";
import SavedRepo, { type SavedRepoProps } from "./SavedRepo";
import { type ConfiguredRepo } from "../../../../../data/extension";

interface SavedProps {
  repos: ConfiguredRepo[] | null;
  loading: boolean;
  error: boolean;
  onRemove: SavedRepoProps["onRemove"];
}

export default function Saved({ repos, loading, error, onRemove }: SavedProps) {
  return (
    <Stack width="100%" spacing={1}>
      {loading && (
        <Stack width="100%" alignItems="center">
          <CircularProgress />
        </Stack>
      )}
      <Typography variant="body1" textAlign="left">
        {error && "An error occurred."}
        {repos !== null &&
          repos.length === 0 &&
          "You do not have any repositories saved."}
        {repos !== null &&
          repos.length > 0 &&
          "Here is a list of your currently saved repositories. You can remove them here."}
      </Typography>
      {repos?.map((repo) => (
        <SavedRepo
          key={repo.url}
          repo={repo}
          onRemove={async () => {
            onRemove(repo).catch((e) => {
              console.error(`failed to remove repo`, repo, e);
            });
          }}
        />
      ))}
    </Stack>
  );
}
