import React, { useState } from "react";
import Alert, { type AlertColor } from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import ClearStorageSetting from "./ClearStorageSetting";
import AccessTokenSetting from "./AccessTokenSetting";

export default function Settings() {
  const [alertType, setAlertType] = useState<AlertColor | "none">("none");
  const [alertMessage, setAlertMessage] = useState("");

  return (
    <Stack width="100%">
      {alertType !== "none" && (
        <Stack padding={1}>
          <Alert
            severity={alertType}
            onClose={() => {
              setAlertType("none");
            }}
          >
            {alertMessage} - Shams
          </Alert>
        </Stack>
      )}
      <AccessTokenSetting
        setAlertType={setAlertType}
        setAlertMessage={setAlertMessage}
      />
      <ClearStorageSetting
        setAlertType={setAlertType}
        setAlertMessage={setAlertMessage}
      />
    </Stack>
  );
}
