import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";
import SavedRepo, { type SavedRepoProps } from "./SavedRepo";
import { type StorageRepo } from "../../../../../data/extension";

interface SavedProps {
  repos: StorageRepo[] | null;
  loading: boolean;
  error: boolean;
  onRemove: SavedRepoProps["onRemove"];
}

export default function Saved({ repos, loading, error, onRemove }: SavedProps) {
  return (
    <Stack padding={2} width="100%" spacing={1}>
      {loading && (
        <Stack width="100%" alignItems="center">
          <CircularProgress />
        </Stack>
      )}
      {error && (
        <Typography variant="body1" textAlign="center">
          An error occurred.
        </Typography>
      )}
      {repos !== null && repos.length === 0 && (
        <Typography variant="body1" textAlign="center">
          You do not have any repositories saved. Go to the Add tab to add a
          repo.
        </Typography>
      )}
      {repos !== null && repos.length > 0 && (
        <Typography variant="body1" textAlign="center">
          Here is a list of your currently saved repositories. You can remove
          them here.
        </Typography>
      )}
      {repos?.map((repo, index) => (
        <SavedRepo
          key={repo.url}
          repo={repo}
          bgcolor={index % 2 === 0 ? "whitesmoke" : "white"}
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
