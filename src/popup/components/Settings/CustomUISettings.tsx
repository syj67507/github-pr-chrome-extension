import {
  CircularProgress,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useGetBlankSpaceBehavior } from "../../hooks";
import {
  type BlankSpaceBehavior,
  setBlankSpaceBehaviorSetting,
} from "../../../data/extension";

export default function CustomUISettings() {
  const [blankSpaceBehavior, setBlankSpaceBehavior, loading] =
    useGetBlankSpaceBehavior();

  return (
    <Stack direction="column" width="100%" padding={1}>
      <Typography variant="body1" textAlign="left">
        Select the behavior you wish to occur when you click on the empty space
        between the repository name and the dropdown icon
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
                console.log(e.target.value);
                setBlankSpaceBehavior(e.target.value as BlankSpaceBehavior);
                setBlankSpaceBehaviorSetting(
                  e.target.value as BlankSpaceBehavior
                ).catch((error) => {
                  console.error(
                    "Failed to set the blank space behavior setting",
                    error
                  );
                });
              }}
            >
              <FormControlLabel
                value="expand"
                control={<Radio />}
                label="Expand"
              />
              <FormControlLabel value="link" control={<Radio />} label="Link" />
            </RadioGroup>
          </FormControl>
        )}
      </Stack>
    </Stack>
  );
}
