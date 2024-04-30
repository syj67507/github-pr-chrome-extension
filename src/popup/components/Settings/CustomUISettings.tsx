import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
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
              sx={{ display: "flex", flexDirection: "row" }}
            >
              <FormControlLabel
                value="expand"
                control={<Radio />}
                label="Expand"
                sx={{ flex: 1 }}
              />
              <FormControlLabel
                value="link"
                control={<Radio />}
                label="Link"
                sx={{ flex: 1 }}
              />
            </RadioGroup>
          </FormControl>
        )}
      </Stack>
    </Stack>
  );
}
