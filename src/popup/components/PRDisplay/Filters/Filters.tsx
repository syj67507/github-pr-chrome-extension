import { Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import React from "react";
import Card from "../../Card/Card";

interface FiltersProps {
  /** Object that contains the current state of user filters */
  filters: {
    /** Determines whether to show the user's pull requests */
    showMine: boolean;
    /** Determines whether or not to include drafts in the display */
    includeDrafts: boolean;
    /** Text filter to look for pull requests that only have this text in it */
    textFilter: string;
  };
  /** set function from the useState hook to set the state of the filters prop */
  setFilters: React.Dispatch<
    React.SetStateAction<{
      showMine: boolean;
      includeDrafts: boolean;
      textFilter: string;
    }>
  >;
}

export default function Filters({ filters, setFilters }: FiltersProps) {
  return (
    <Card>
      <TextField
        variant="outlined"
        size="small"
        placeholder="filter"
        value={filters.textFilter}
        onChange={(e) => {
          setFilters({
            ...filters,
            textFilter: e.target.value,
          });
        }}
        inputProps={{
          style: { textAlign: "center", padding: 4 },
        }}
        fullWidth
      />
      <Stack
        paddingX={1}
        display="flex"
        flexDirection="row"
        justifyContent="flex-start"
        width="100%"
      >
        <Tooltip
          title="If checked, then the pull requests displayed will include those that are marked as drafts"
          followCursor
          disableInteractive
          enterDelay={500}
          enterNextDelay={500}
        >
          <FormControlLabel
            label={<Typography variant="caption">Include Drafts</Typography>}
            control={
              <Checkbox
                checked={filters.includeDrafts}
                onChange={() => {
                  setFilters({
                    ...filters,
                    includeDrafts: !filters.includeDrafts,
                  });
                }}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            sx={{
              flex: 1,
            }}
          />
        </Tooltip>
        <Tooltip
          title="If checked, then only your pull requests will be shown"
          followCursor
          disableInteractive
          enterDelay={500}
          enterNextDelay={500}
        >
          <FormControlLabel
            sx={{
              flex: 1,
            }}
            label={<Typography variant="caption">Show Mine</Typography>}
            control={
              <Checkbox
                checked={filters.showMine}
                onChange={() => {
                  setFilters({
                    ...filters,
                    showMine: !filters.showMine,
                  });
                }}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
          />
        </Tooltip>
      </Stack>
    </Card>
  );
}
