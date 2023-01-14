import React, { useState } from "react";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import chrome from "../../../data/extension";

export default function Permissions() {
  const [token, setToken] = useState("");

  return (
    <Stack direction="column" width="50%" padding={2} spacing={2}>
      <Typography variant="body1" textAlign="center">
        Set your personal access token here. Create you personal access token
        under Developer Settings in your GitHub account.
      </Typography>
      <Link
        target="_blank" // new tab
        textAlign="center"
        variant="body1"
        href="https://docs.github.com/en/enterprise-server@3.4/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token"
      >
        Click here for more information
      </Link>
      <TextField
        label="Personal Access Token"
        helperText="ghp_"
        variant="standard"
        value={token}
        onChange={(e) => {
          setToken(e.target.value);
        }}
      />
      <Stack width="100%" direction="row" justifyContent="flex-end" spacing={2}>
        <Button
          variant="contained"
          onClick={async () => {
            await chrome.setToken(token);
          }}
          disabled={token === ""}
        >
          Save
        </Button>
      </Stack>
    </Stack>
  );
}
