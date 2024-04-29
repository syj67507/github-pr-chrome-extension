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
import { useGetHeaderClickBehavior } from "../../hooks";
import {
  type HeaderClickBehavior,
  saveHeaderClickBehavior,
} from "../../../data/extension";

export default function CustomUISettings() {
  const [blankSpaceBehavior, setBlankSpaceBehavior, loading] =
    useGetHeaderClickBehavior();

  return (
    <Stack direction="column" width="100%" padding={1}>
      <Typography variant="body1" textAlign="left">
        The behavior when click the extra space between repo name and the
        dropdown button
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
                setBlankSpaceBehavior(e.target.value as HeaderClickBehavior);
                saveHeaderClickBehavior(
                  e.target.value as HeaderClickBehavior
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
