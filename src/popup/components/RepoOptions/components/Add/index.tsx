import React, { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { type StorageRepo } from "../../../../../data/extension";

interface AddProps {
  onSave: (
    repo: StorageRepo["url"],
    jiraTags: StorageRepo["jiraTags"],
    jiraDomain: StorageRepo["jiraDomain"]
  ) => Promise<void>;
}

export default function Add({ onSave }: AddProps) {
  const [repository, setRepository] = useState("");
  const [rawJiraTags, setRawJiraTags] = useState("");
  const [jiraDomain, setJiraDomain] = useState("");

  const saveEnabled1 =
    repository !== "" && rawJiraTags === "" && jiraDomain === ""; // only repository field
  const saveEnabled2 =
    repository !== "" && rawJiraTags !== "" && jiraDomain !== ""; // specify both jira tags
  const saveEnabled = saveEnabled1 || saveEnabled2;

  return (
    <Stack
      padding={2}
      spacing={2}
      width="100%"
      direction="column"
      alignItems="center"
      justifyContent="center"
      borderBottom="1px solid whitesmoke"
    >
      <Typography variant="body1" textAlign="center">
        Add a repository by filling out the following fields and clicking save.
      </Typography>
      <TextField
        label="Repository URL"
        placeholder="https://github.com/<username>/<repositoryName>"
        variant="standard"
        value={repository}
        onChange={(e) => {
          setRepository(e.target.value);
        }}
        fullWidth
      />
      <TextField
        label="(Optional) JIRA Project Tag"
        helperText="'TAG' as in TAG-1234"
        placeholder="TAG,PROJ,..."
        variant="standard"
        value={rawJiraTags}
        onChange={(e) => {
          setRawJiraTags(e.target.value);
        }}
        fullWidth
      />
      <TextField
        label="(Optional) JIRA Domain"
        helperText={`Domain to build the url to JIRA ticket ${
          jiraDomain ?? "<domain>"
        }/browse/TAG-1234`}
        placeholder="https://jira.company.com"
        variant="standard"
        value={jiraDomain}
        onChange={(e) => {
          setJiraDomain(e.target.value);
        }}
        fullWidth
      />
      <Stack width="100%" direction="row" justifyContent="flex-end" spacing={2}>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            setRepository("");
            setRawJiraTags("");
            setJiraDomain("");
          }}
          sx={{
            bgcolor: "whitesmoke",
            color: "#444",
            "&:hover": {
              bgcolor: "#dcdcdc",
              color: "#444",
            },
          }}
        >
          Clear
        </Button>
        <Button
          variant="contained"
          disabled={!saveEnabled}
          onClick={() => {
            // implementation of onSave passed in as prop from Repos component
            const jiraTagsSanizited =
              rawJiraTags.length > 0 ? rawJiraTags.split(",") : undefined;
            const jiraDomainSanizited =
              jiraDomain.length > 0 ? jiraDomain : undefined;
            onSave(repository, jiraTagsSanizited, jiraDomainSanizited).catch(
              (e) => {
                console.error(
                  `failed to save repo ${repository}, ${jiraDomain}, ${rawJiraTags}
                  }`,
                  e
                );
              }
            );
          }}
          sx={{
            bgcolor: "#6cc644",
            "&:hover": {
              bgcolor: "#4f982e",
            },
          }}
        >
          Save
        </Button>
      </Stack>
    </Stack>
  );
}
