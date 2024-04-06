import React, { useState } from "react";
import Alert, { type AlertColor } from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Card from "../Card/Card";
import ResetStorageSetting from "./ResetStorageSetting";
import AccessTokenSetting from "./AccessTokenSetting";

export default function Settings() {
  const [alertType, setAlertType] = useState<AlertColor | "none">("none");
  const [alertMessage, setAlertMessage] = useState("");

  return (
    <Stack width="100%" padding={1} spacing={1}>
      {alertType !== "none" && (
        <Alert
          severity={alertType}
          onClose={() => {
            setAlertType("none");
          }}
        >
          {alertMessage}
        </Alert>
      )}
      <Card>
        <AccessTokenSetting
          setAlertType={setAlertType}
          setAlertMessage={setAlertMessage}
        />
      </Card>
      <Card>
        <ResetStorageSetting
          setAlertType={setAlertType}
          setAlertMessage={setAlertMessage}
        />
      </Card>
    </Stack>
  );
}
