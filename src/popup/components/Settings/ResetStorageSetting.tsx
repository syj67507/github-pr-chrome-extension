import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import * as browser from "../../../data/storage";
import ResetButton from "../Buttons/ResetButton";
import Card from "../Card/Card";

export default function ResetStorageSetting() {
  const [open, setOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  return (
    <Card sx={{ bgcolor: "white" }}>
      <Stack direction="column" width="100%" padding={1} spacing={2}>
        <Typography variant="body2" textAlign="left">
          Reset storage
        </Typography>

        <Stack width="100%" direction="row" justifyContent="space-between">
          <Typography variant="caption" textAlign="left">
            Any issues may stem from invalid storage data and resetting storage
            can clear it
          </Typography>
          <ResetButton
            onClick={() => {
              browser
                .resetStorage()
                .then(() => {
                  setToastMessage("Storage reset!");
                  setOpen(true);
                })
                .catch(() => {
                  setToastMessage("Failed to reset storage.");
                  setOpen(true);
                  console.error("Failed to reset storage.");
                });
            }}
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
