import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";
import { useGetHeaderClickBehavior } from "../../hooks";
import Card from "../Card/Card";
import { saveHeaderClickBehavior } from "../../../data/settings";
import { type HeaderClickBehavior } from "../../../data/storage";

export default function HeaderClickSetting() {
  const [blankSpaceBehavior, setBlankSpaceBehavior, loading] =
    useGetHeaderClickBehavior();

  return (
    <Card sx={{ bgcolor: "white" }}>
      <Stack direction="column" width="100%" padding={1}>
        <Typography variant="body2" textAlign="left" paddingBottom={1}>
          Header Click Behavior
        </Typography>
        <Stack>
          {loading && (
            <Stack sx={{ alignItems: "center", height: "42px" }}>
              <CircularProgress />
            </Stack>
          )}
          {!loading && (
            <FormControl>
              <RadioGroup
                value={blankSpaceBehavior}
                row
                onChange={(e) => {
                  setBlankSpaceBehavior(e.target.value as HeaderClickBehavior);
                  saveHeaderClickBehavior(
                    e.target.value as HeaderClickBehavior
                  ).catch((error: any) => {
                    console.error(
                      "Failed to set the blank space behavior setting",
                      error
                    );
                  });
                }}
                sx={{ display: "flex", flexDirection: "row" }}
              >
                <FormControlLabel
                  value="expand"
                  control={<Radio />}
                  label={<Typography variant="caption">Expand</Typography>}
                  sx={{ flex: 1 }}
                />
                <FormControlLabel
                  value="link"
                  control={<Radio />}
                  label={<Typography variant="caption">Link</Typography>}
                  sx={{ flex: 1 }}
                />
              </RadioGroup>
            </FormControl>
          )}
        </Stack>
        <Typography variant="caption" textAlign="left">
          Selecting &apos;Expand&apos; will expand the repo header in the extra
          space between the repo title and the dropdown. Selecting
          &apos;Link&apos; will open the repo in a new tab
        </Typography>
      </Stack>
    </Card>
  );
}
