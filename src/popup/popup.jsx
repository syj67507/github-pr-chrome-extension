import { Box, Button, CssBaseline, Stack } from "@mui/material";
import React, { useState } from "react";
import { render } from "react-dom";
import PRDisplay from "./components/PRDisplay";
import Permissions from "./components/Permissions";
import RepoOptions from "./components/RepoOptions";

function Popup() {
  const [page, setPage] = useState("PR");

  return (
    <Stack
      spacing={0}
      padding={0}
      width="100%"
      alignItems="flex-start"
      bgcolor="white"
    >
      <CssBaseline />
      <Box
        sx={{
          width: "100%",
          padding: 1.5,
          background: "linear-gradient(#222, #000)",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          // variant="h6"
          sx={{
            color: "whitesmoke",
            bgcolor: page === "PR" ? "#000" : undefined,
          }}
          onClick={() => setPage("PR")}
        >
          PR
        </Button>
        <Button
          sx={{
            color: "whitesmoke",
            bgcolor: page === "Add" ? "#000" : undefined,
          }}
          onClick={() => setPage("Repos")}
        >
          Repos
        </Button>
        <Button
          sx={{
            color: "whitesmoke",
            bgcolor: page === "Permissions" ? "#000" : undefined,
          }}
          onClick={() => setPage("Permissions")}
        >
          Permissions
        </Button>
      </Box>
      {page === "PR" && <PRDisplay />}
      {page === "Repos" && <RepoOptions />}
      {page === "Permissions" && <Permissions />}
    </Stack>
  );
}

render(<Popup />, document.getElementById("root"));
