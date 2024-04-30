import React from "react";
import Stack from "@mui/material/Stack";
import ResetStorageSetting from "./ResetStorageSetting";
import HeaderClickSetting from "./HeaderClickSetting";
import AccessTokenSetting from "./AccessTokenSetting";
import AnimatedExpandSettingCard from "./AnimatedExpandSettingCard";

export default function Settings() {
  return (
    <Stack width="100%" padding={1} spacing={1} bgcolor="whitesmoke">
      <AccessTokenSetting />
      <HeaderClickSetting />
      <AnimatedExpandSettingCard />
      <ResetStorageSetting />
    </Stack>
  );
}
