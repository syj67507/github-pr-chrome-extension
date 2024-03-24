import { Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import React from "react";

interface FiltersProps {
  filters: {
    showMine: boolean;
    includeDrafts: boolean;
    textFilter: string;
  };
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
    <Stack
      sx={{
        borderBottom: "1px solid whitesmoke",
      }}
    >
      <TextField
        variant="standard"
        placeholder="filter"
        value={filters.textFilter}
        onChange={(e) => {
          setFilters({
            ...filters,
            textFilter: e.target.value,
          });
        }}
        inputProps={{
          style: { textAlign: "center" },
        }}
        sx={{
          bgcolor: "white",
        }}
      />
      <Stack paddingX={1} direction="row" justifyContent="space-evenly">
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
    </Stack>
  );
}
