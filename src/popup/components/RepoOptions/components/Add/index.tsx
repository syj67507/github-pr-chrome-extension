import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { type ConfiguredRepo } from "../../../../../data/extension";
import SaveButton from "../../../Buttons/SaveButton";
import ClearButton from "../../../Buttons/ClearButton";

interface AddProps {
  onSave: (
    repo: ConfiguredRepo["url"],
    jiraTags: ConfiguredRepo["jiraTags"],
    jiraDomain: ConfiguredRepo["jiraDomain"]
  ) => Promise<void>;
}

export default function Add({ onSave }: AddProps) {
  const [repository, setRepository] = useState("");
  const [rawJiraTags, setRawJiraTags] = useState("");
  const [jiraDomain, setJiraDomain] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [jiraDomainError, setJiraDomainError] = useState(false);

  const saveEnabledRepoOnly =
    repository !== "" && rawJiraTags === "" && jiraDomain === "";
  const saveEnabledRepoWithJira =
    repository !== "" &&
    rawJiraTags !== "" &&
    jiraDomain !== "" &&
    !jiraDomainError;
  const saveEnabled = saveEnabledRepoOnly || saveEnabledRepoWithJira;

  return (
    <Stack
      spacing={2}
      width="100%"
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="body1" textAlign="left">
        Add or update a repository by filling out the following fields and
        clicking save.
      </Typography>
      <TextField
        label="Repository URL"
        helperText="The homepage URL of the repository on GitHub"
        placeholder="https://github.com/<username>/<repositoryName>"
        variant="outlined"
        value={repository}
        onChange={(e) => {
          setRepository(e.target.value);
        }}
        fullWidth
        size="small"
      />
      <TextField
        label="(Optional) Jira Project Tag"
        helperText="'TAG' as in TAG-1234"
        placeholder="TAG,PROJ,..."
        variant="outlined"
        value={rawJiraTags}
        onChange={(e) => {
          setRawJiraTags(e.target.value);
        }}
        fullWidth
        size="small"
      />
      <TextField
        label="(Optional) Jira Domain URL"
        helperText={`Base URL domain to build the url to Jira ticket. Make sure the following URL looks valid: ${
          jiraDomain === "" ? "<domain>" : jiraDomain
        }/browse/TAG-1234`}
        placeholder="https://jira.company.com"
        variant="outlined"
        value={jiraDomain}
        onChange={(e) => {
          setJiraDomain(e.target.value);
          setJiraDomainError(
            !e.target.value.startsWith("https://") ||
              e.target.value.endsWith("/")
          );
        }}
        fullWidth
        size="small"
        error={jiraDomainError}
      />
      <Stack width="100%" direction="row" justifyContent="flex-end" spacing={2}>
        <ClearButton
          onClick={() => {
            setRepository("");
            setRawJiraTags("");
            setJiraDomain("");
          }}
        />
        <SaveButton
          disabled={!saveEnabled}
          onClick={() => {
            // implementation of onSave passed in as prop from Repos component
            const jiraTagsSanizited =
              rawJiraTags.length > 0 ? rawJiraTags.split(",") : undefined;
            const jiraDomainSanizited =
              jiraDomain.length > 0 ? jiraDomain : undefined;
            onSave(repository, jiraTagsSanizited, jiraDomainSanizited)
              .then(() => {
                setSnackbarMessage("Repository has been added/updated!");
                setSnackbarOpen(true);
              })
              .catch((e) => {
                setSnackbarMessage("Failed to add or update repository.");
                setSnackbarOpen(true);
                console.error(
                  `failed to save repo ${repository}, ${jiraDomain}, ${rawJiraTags}`,
                  e
                );
              });
          }}
        />
      </Stack>
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
