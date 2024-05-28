import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Switch from "@mui/material/Switch";
import React from "react";
import { saveStatusChecksSetting } from "../../../data/extension";
import { useGetStatusChecksSetting } from "../../hooks";
import Card from "../Card/Card";

export default function StatusChecksSettingCard() {
  const [statusCheckSetting, setStatusCheckSetting, statusCheckLoading] =
    useGetStatusChecksSetting();

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
          Status Checks
        </Typography>
        {statusCheckLoading && (
          <Stack sx={{ alignItems: "center", height: "42px" }}>
            <CircularProgress />
          </Stack>
        )}
        {!statusCheckLoading && (
          <Switch
            checked={statusCheckSetting}
            onChange={(e) => {
              setStatusCheckSetting(e.target.checked);
              saveStatusChecksSetting(e.target.checked).catch((error: any) => {
                console.error("Failed to set the status check setting", error);
              });
            }}
            inputProps={{ "aria-label": "status-check-setting" }}
          />
        )}
      </Stack>

      <Stack padding={1}>
        <Typography variant="caption">
          Turn this on if you want to see the status checks for each pull
          request
        </Typography>
        <br />
        <Typography variant="caption">
          This is an experimental feature and the status check reported may not
          be completely accurate if third party / external tools are used for
          status checks
        </Typography>
      </Stack>
    </Card>
  );
}
