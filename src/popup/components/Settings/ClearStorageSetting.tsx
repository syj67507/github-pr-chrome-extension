import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import React from "react";
import * as browser from "../../../data/extension";

export default function ClearStorageSetting() {
  return (
    <Stack direction="column" width="100%" padding={2} spacing={2}>
      <Typography variant="body1" textAlign="center">
        Any issues may stem from invalid storage data. Clear the storage here.
      </Typography>
      <Stack width="100%" direction="row" justifyContent="flex-end" spacing={2}>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            browser.resetStorage().catch(() => {
              console.error("Failed to clear storage.");
            });
          }}
        >
          Clear
        </Button>
      </Stack>
    </Stack>
  );
}
