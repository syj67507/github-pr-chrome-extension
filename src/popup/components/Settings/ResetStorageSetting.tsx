import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import * as browser from "../../../data/extension";

export default function ResetStorageSetting() {
  const [open, setOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  return (
    <Stack direction="column" width="100%" padding={1} spacing={2}>
      <Typography variant="body1" textAlign="left">
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
                setToastMessage("Storage reset!");
                setOpen(true);
              })
              .catch(() => {
                setToastMessage("Failed to reset storage.");
                setOpen(true);
                console.error("Failed to reset storage.");
              });
          }}
        >
          Clear
        </Button>
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
  );
}
