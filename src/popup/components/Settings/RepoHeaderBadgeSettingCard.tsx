import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Switch from "@mui/material/Switch";
import React from "react";
import { useGetRepoHeaderBadgeSetting } from "../../hooks";
import Card from "../Card/Card";
import { saveRepoHeaderBadgeSetting } from "../../../data/extension/repoHeaderBadgeSetting";

export default function RepoHeaderBadgeSettingCard() {
  const [
    repoHeaderBadgeSetting,
    setRepoHeaderBadgeSetting,
    repoHeaderBadgeSettingLoading,
  ] = useGetRepoHeaderBadgeSetting();

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
          Repository Header Badge
        </Typography>
        {repoHeaderBadgeSettingLoading && (
          <Stack sx={{ alignItems: "center", height: "42px" }}>
            <CircularProgress />
          </Stack>
        )}
        {!repoHeaderBadgeSettingLoading && (
          <Switch
            checked={repoHeaderBadgeSetting}
            onChange={(e) => {
              setRepoHeaderBadgeSetting(e.target.checked);
              saveRepoHeaderBadgeSetting(e.target.checked).catch(
                (error: any) => {
                  console.error(
                    "Failed to set the repo header badge setting",
                    error
                  );
                }
              );
            }}
            inputProps={{ "aria-label": "repo-header-badge-setting" }}
          />
        )}
      </Stack>

      <Stack padding={1}>
        <Typography variant="caption">
          Turn this on if you want to see a badge that indicates how many pull
          requests are open for each repository in the header
        </Typography>
      </Stack>
    </Card>
  );
}
