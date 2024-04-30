import React from "react";
import Stack from "@mui/material/Stack";
import Card from "../Card/Card";
import ResetStorageSetting from "./ResetStorageSetting";
import CustomUISettings from "./CustomUISettings";
import AccessTokenSetting from "./AccessTokenSetting";
import AnimatedExpandSettingCard from "./AnimatedExpandSettingCard";

export default function Settings() {
  return (
    <Stack width="100%" padding={1} spacing={1} bgcolor="whitesmoke">
      <Card sx={{ bgcolor: "white" }}>
        <AccessTokenSetting />
      </Card>
      <Card sx={{ bgcolor: "white" }}>
        <CustomUISettings />
      </Card>
      <AnimatedExpandSettingCard />
      <Card sx={{ bgcolor: "white" }}>
        <ResetStorageSetting />
      </Card>
    </Stack>
  );
}
