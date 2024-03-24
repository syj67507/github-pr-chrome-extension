import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import React from "react";

interface FiltersProps {
  filters: { showDrafts: boolean; textFilter: string };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      showDrafts: boolean;
      textFilter: string;
    }>
  >;
}

export default function Filters({ filters, setFilters }: FiltersProps) {
  return (
    <Stack>
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
        <FormControlLabel
          label="Show Drafts"
          control={
            <Checkbox
              checked={filters.showDrafts}
              onChange={() => {
                setFilters({
                  ...filters,
                  showDrafts: !filters.showDrafts,
                });
              }}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
        />
      </Stack>
    </Stack>
  );
}
