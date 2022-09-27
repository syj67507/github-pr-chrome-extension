/* global chrome */
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { addRepository } from "../../../../../data/chromeStorage";

export default function Add() {
  const [repository, setRepository] = useState("");
  const [jiraTag, setJiraTag] = useState("");
  const [jiraDomain, setJiraDomain] = useState("");
  
  const saveEnabled1 = repository && (!jiraTag && !jiraDomain); // only repository field
  const saveEnabled2 = repository && (jiraTag && jiraDomain); // specify both jira tags
  const saveEnabled = saveEnabled1 || saveEnabled2

  return (
    <Stack
      padding={2}
      spacing={2}
      width="100%"
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <TextField
        label="Repository URL"
        helperText="https://github.com/<username>/<repositoryName>"
        variant="standard"
        value={repository}
        onChange={(e) => {
          setRepository(e.target.value);
        }}
        fullWidth
      />
      <TextField
        label="JIRA Tag (optional)"
        helperText="'TAG' as in TAG-1234"
        variant="standard"
        value={jiraTag}
        onChange={(e) => {
          setJiraTag(e.target.value);
        }}
        fullWidth
      />
      <TextField
        label="JIRA Domain (optional)"
        helperText="Domain to build the url to JIRA ticket [domain]/browse/TAG-1234"
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
          onClick={async () => {
            setRepository("");
            setJiraTag("");
          }}
          sx={{
            bgcolor: "whitesmoke",
            color: "#444",
            '&:hover': {
              bgcolor: "#dcdcdc",
              color: "#444",
            }
          }}
        >
          Clear
        </Button>
        <Button
          variant="contained"
          disabled={!saveEnabled}
          onClick={async () => {
            await addRepository(repository, jiraTag, jiraDomain);
          }}
          sx={{
            bgcolor: "#6cc644",
            '&:hover': {
              bgcolor: "#4f982e",
            }
          }}
        >
          Save
        </Button>
      </Stack>
    </Stack>
  );
}
