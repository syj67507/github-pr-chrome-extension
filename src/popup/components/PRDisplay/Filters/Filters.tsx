import { IconButton, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import React, { useState } from "react";
import Card from "../../Card/Card";
import { type Filters, saveFilterOptions } from "../../../../data/filters";

interface FiltersProps {
  /**
   * Object that contains the current state of user filters that mirrors
   * what was saved to this extension's storage
   */
  filters: Filters;
  /** set function from the useState hook to set the state of the filters prop */
  setFilters: React.Dispatch<
    React.SetStateAction<{
      showMine: boolean;
      includeDrafts: boolean;
      textFilter: string;
    }>
  >;
}

export default function FilterOptions({ filters, setFilters }: FiltersProps) {
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout>();

  /**
   * A handler that will call common functions when any of the
   * filtering options have been changed
   */
  function handleOnChange(updatedFilters: Filters) {
    setFilters(updatedFilters);

    saveFilterOptions(updatedFilters).catch(() => {
      console.error("failed to save filter state");
    });
  }

  /**
   * A handler that is the same as handleOnChange but debounced
   * specifically made for the text filter to not be called on each
   * individual change but only after the user has finished typing
   */
  function handleOnChangeDebounced(updatedFilters: Filters) {
    setFilters(updatedFilters);

    // Need to clear the previous timeout if the user hasn't finished typing
    if (debounceTimeout != null) {
      clearTimeout(debounceTimeout);
    }

    // The timeout will be the delay before checking if the user has
    // finished updating the filters
    const timeoutId = setTimeout(() => {
      saveFilterOptions(updatedFilters).catch(() => {
        console.error("failed to save filter state");
      });
    }, 300);

    // Keep track of the new timeout on the latest change
    setDebounceTimeout(timeoutId);
  }

  return (
    <Card sx={{ bgcolor: "white" }}>
      <TextField
        variant="outlined"
        size="small"
        placeholder="filter"
        value={filters.textFilter}
        onChange={(e) => {
          const updatedFilters: Filters = {
            ...filters,
            textFilter: e.target.value,
          };
          handleOnChangeDebounced(updatedFilters);
        }}
        InputProps={{
          endAdornment: (
            <IconButton
              disableRipple
              sx={{
                padding: 0, // set to 0 since padding of the button was expanding the textfield
              }}
              onClick={() => {
                const updatedFilters: Filters = {
                  ...filters,
                  textFilter: "",
                };
                handleOnChange(updatedFilters);
              }}
            >
              <ClearIcon />
            </IconButton>
          ),
        }}
        // apparently InputProps and inputProps are detected as duplicates
        // eslint-disable-next-line react/jsx-no-duplicate-props
        inputProps={{
          style: { textAlign: "center", padding: 4 },
        }}
        sx={{
          paddingX: 1, // to make the width match with the rest of the alignment
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
                  const updatedFilters: Filters = {
                    ...filters,
                    includeDrafts: !filters.includeDrafts,
                  };
                  handleOnChange(updatedFilters);
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
                  const updatedFilters: Filters = {
                    ...filters,
                    showMine: !filters.showMine,
                  };
                  handleOnChange(updatedFilters);
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
