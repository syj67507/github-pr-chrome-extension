import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import SavedRepo, { type SavedRepoProps } from "./SavedRepo";
import { type ConfiguredRepo } from "../../../../../data/extension";

interface SavedProps {
  repos: ConfiguredRepo[] | null;
  loading: boolean;
  error: boolean;
  onRemove: SavedRepoProps["onRemove"];
}

export default function Saved({ repos, loading, error, onRemove }: SavedProps) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

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
            onRemove(repo)
              .then(() => {
                setSnackbarMessage(`Removed ${repo.url} successfully!`);
                setSnackbarOpen(true);
              })
              .catch((e) => {
                setSnackbarMessage(`Failed to remove ${repo.url}.`);
                setSnackbarOpen(true);
                console.error(`failed to remove repo`, repo, e);
              });
          }}
        />
      ))}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={snackbarOpen}
        onClose={() => {
          setSnackbarOpen(false);
          setSnackbarMessage("");
        }}
        key="bottomleft"
        sx={{
          width: "fit-content",
          borderRadius: 10,
        }}
        autoHideDuration={2000}
        message={snackbarMessage}
      />
    </Stack>
  );
}
