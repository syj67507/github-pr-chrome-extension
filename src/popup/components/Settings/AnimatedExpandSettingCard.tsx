import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Switch from "@mui/material/Switch";
import React from "react";
import { useGetAnimatedExpandSetting } from "../../hooks";
import Card from "../Card/Card";
import { saveAnimatedExpandSetting } from "../../../data/settings";

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
        <Typography variant="body2" textAlign="left">
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
              saveAnimatedExpandSetting(e.target.checked).catch(
                (error: any) => {
                  console.error(
                    "Failed to set the animated expand setting",
                    error
                  );
                }
              );
            }}
            inputProps={{ "aria-label": "animated-expand-setting" }}
          />
        )}
      </Stack>

      <Stack padding={1}>
        <Typography variant="caption">
          Turn this on if you want the repository section to open with a smooth
          transition. Note that there may be performance issues.
        </Typography>
      </Stack>
    </Card>
  );
}
