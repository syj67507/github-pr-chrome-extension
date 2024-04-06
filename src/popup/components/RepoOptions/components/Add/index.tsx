import React, { useState } from "react";
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

  const saveEnabled1 =
    repository !== "" && rawJiraTags === "" && jiraDomain === ""; // only repository field
  const saveEnabled2 =
    repository !== "" && rawJiraTags !== "" && jiraDomain !== ""; // specify both jira tags
  const saveEnabled = saveEnabled1 || saveEnabled2;

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
        helperText={`Base URL domain to build the url to Jira ticket ${
          jiraDomain ?? "<domain>"
        }/browse/TAG-1234`}
        placeholder="https://jira.company.com"
        variant="outlined"
        value={jiraDomain}
        onChange={(e) => {
          setJiraDomain(e.target.value);
        }}
        fullWidth
        size="small"
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
        />
      </Stack>
    </Stack>
  );
}
