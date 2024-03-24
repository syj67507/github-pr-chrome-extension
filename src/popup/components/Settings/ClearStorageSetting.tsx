import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import React from "react";
import { type AlertColor } from "@mui/material/Alert";
import * as browser from "../../../data/extension";

interface ClearStorageSettingProps {
  setAlertType: React.Dispatch<React.SetStateAction<AlertColor | "none">>;
  setAlertMessage: React.Dispatch<React.SetStateAction<string>>;
}

export default function ClearStorageSetting({
  setAlertType,
  setAlertMessage,
}: ClearStorageSettingProps) {
  return (
    <Stack direction="column" width="100%" padding={2} spacing={2}>
      <Typography variant="body1" textAlign="center">
        Any issues may stem from invalid storage data. Reset the storage here.
      </Typography>
      <Stack width="100%" direction="row" justifyContent="flex-end" spacing={2}>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            browser
              .resetStorage()
              .then(() => {
                setAlertType("success");
                setAlertMessage("Storage reset!");
              })
              .catch(() => {
                console.error("Failed to reset storage.");
                setAlertType("error");
                setAlertMessage("Failed to reset storage.");
              });
          }}
        >
          Clear
        </Button>
      </Stack>
    </Stack>
  );
}
