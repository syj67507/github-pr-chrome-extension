import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
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
      alignItems="flex-start"
      bgcolor="white"
      sx={{
        width: "400px",
        maxHeight: "600px",
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
          width: 8,
        },
        "&::-webkit-scrollbar-track": {
          background: "rgba(0, 0, 0, 0.1)",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "rgba(0, 0, 0, 0.4)",
        },
        scrollbarColor: "rgba(0, 0, 0, 0.4) rgba(0, 0, 0, 0.1)",
        scrollbarWidth: "thin",
      }}
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
