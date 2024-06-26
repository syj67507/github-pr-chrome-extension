import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import * as browser from "../../../data/extension";
import SaveButton from "../Buttons/SaveButton";
import Card from "../Card/Card";

export default function AccessTokenSetting() {
  const [token, setToken] = useState("");
  const [open, setOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  return (
    <Card sx={{ bgcolor: "white" }}>
      <Stack direction="column" width="100%" padding={1} spacing={2}>
        <Typography variant="body2" textAlign="left">
          Classic Personal Access Token
        </Typography>
        <Typography variant="caption" textAlign="left">
          Create your classic personal access token under
          <strong> Developer Settings</strong> in your GitHub account.
        </Typography>
        <Typography variant="caption" textAlign="left">
          Make sure to provide it the <strong>repo</strong> permissions and
          <strong> authorize with SSO</strong> for any private repos.
        </Typography>
        <Link
          target="_blank" // new tab
          textAlign="left"
          variant="caption"
          href="https://docs.github.com/en/enterprise-server@3.12/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token"
        >
          Click here for more info on creating your personal access token
        </Link>
        <TextField
          label="ghp_..."
          variant="standard"
          value={token}
          onChange={(e) => {
            setToken(e.target.value);
          }}
        />
        <Stack
          width="100%"
          direction="row"
          justifyContent="flex-end"
          spacing={2}
        >
          <SaveButton
            onClick={() => {
              browser
                .setToken(token)
                .then(() => {
                  setToastMessage("Personal access token saved!");
                  setOpen(true);
                  setToken("");
                })
                .catch(() => {
                  setToastMessage("Failed to save personal access token.");
                  setOpen(true);
                  console.error("Failed to save personal access token");
                });
            }}
            disabled={token === ""}
          />
        </Stack>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          key="bottomleft"
          sx={{
            width: "fit-content",
            borderRadius: 10,
          }}
          autoHideDuration={2000}
          message={toastMessage}
        />
      </Stack>
    </Card>
  );
}
