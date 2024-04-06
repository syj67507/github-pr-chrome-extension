import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import { type AlertColor } from "@mui/material/Alert";
import * as browser from "../../../data/extension";

interface AccessTokenSettingProps {
  setAlertType: React.Dispatch<React.SetStateAction<AlertColor | "none">>;
  setAlertMessage: React.Dispatch<React.SetStateAction<string>>;
}

export default function AccessTokenSetting({
  setAlertType,
  setAlertMessage,
}: AccessTokenSettingProps) {
  const [token, setToken] = useState("");

  return (
    <Stack direction="column" width="100%" padding={1} spacing={2}>
      <Typography variant="body1" textAlign="left">
        Set your personal access token here. Create you personal access token
        under Developer Settings in your GitHub account.
      </Typography>
      <Link
        target="_blank" // new tab
        textAlign="left"
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
          onClick={() => {
            browser
              .setToken(token)
              .then(() => {
                setAlertType("success");
                setAlertMessage("Personal access token saved!");
                setToken("");
              })
              .catch(() => {
                console.error("Failed to save personal access token");
                setAlertType("error");
                setAlertMessage("Failed to save personal access token.");
              });
          }}
          disabled={token === ""}
        >
          Save
        </Button>
      </Stack>
    </Stack>
  );
}
