import { Stack, Typography, CircularProgress, Switch } from "@mui/material";
import React from "react";
import { saveAnimatedExpandSetting } from "../../../data/extension";
import { useGetAnimatedExpandSetting } from "../../hooks";
import Card from "../Card/Card";

export default function AnimatedExpandSettingCard() {
  const [
    animatedExpandSetting,
    setAnimatedExpandSetting,
    animatedExpandLoading,
  ] = useGetAnimatedExpandSetting();

  return (
    <Card sx={{ bgcolor: "white" }}>
      <Stack
        width="100%"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        paddingX={1}
      >
        <Typography variant="body1" textAlign="left">
          Animated expands for repo section
        </Typography>
        {animatedExpandLoading && (
          <Stack sx={{ alignItems: "center", height: "42px" }}>
            <CircularProgress />
          </Stack>
        )}
        {!animatedExpandLoading && (
          <Switch
            checked={animatedExpandSetting}
            onChange={(e) => {
              setAnimatedExpandSetting(e.target.checked);
              saveAnimatedExpandSetting(e.target.checked).catch((error) => {
                console.error(
                  "Failed to set the animated expand setting",
                  error
                );
              });
            }}
            inputProps={{ "aria-label": "animated-expand-setting" }}
          />
        )}
      </Stack>

      <Stack padding={1}>
        <Typography variant="body2">
          Turn this on if you want the repository section to open with a smooth
          transition. Note that there may be performance issues.
        </Typography>
      </Stack>
    </Card>
  );
}
