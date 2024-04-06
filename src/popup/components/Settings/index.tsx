import React from "react";
import Stack from "@mui/material/Stack";
import Card from "../Card/Card";
import ResetStorageSetting from "./ResetStorageSetting";
import AccessTokenSetting from "./AccessTokenSetting";

export default function Settings() {
  return (
    <Stack width="100%" padding={1} spacing={1}>
      <Card>
        <AccessTokenSetting />
      </Card>
      <Card>
        <ResetStorageSetting />
      </Card>
    </Stack>
  );
}
