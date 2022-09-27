import regeneratorRuntime from "regenerator-runtime";
import React, { useState } from "react";
import { Button, CssBaseline, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Add from "./components/Add";
import Saved from "./components/Saved";
import Permissions from "./components/Permissions";

export default function Options() {
  const [pageState, setPageState] = useState("Add");

  return (
    <>
      <CssBaseline />
      {/* Header Navigation */}
      <Box sx={{
        padding: 1,
        gap: 1,
        width: "100%",
        background: "linear-gradient(#333, #000)",
        color: "white",
        display: "flex",
        justifyContent: "center",
      }}>
        <Button 
          sx={{
            "&:hover": {
              backgroundColor: "#444",
            },
            backgroundColor: pageState === "Add" ? "#111" : null,
          }}
          onClick={(e) => setPageState(e.target.firstChild.data)}
        >
          Add
        </Button>
        <Button 
          sx={{
            "&:hover": {
              backgroundColor: "#111",
            },
            backgroundColor: pageState === "Saved" ? "#111" : null,
          }}
          onClick={(e) => setPageState(e.target.firstChild.data)}
        >
          Saved
        </Button>
        <Button 
          sx={{
            "&:hover": {
              backgroundColor: "#111",
            },
            backgroundColor: pageState === "Permissions" ? "#111" : null,
          }}
          onClick={(e) => setPageState(e.target.firstChild.data)}
        >
          Permissions
        </Button>
      </Box>
      
      {/* Page content */}
      <Box sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        {pageState === "Add" && <Add />}
        {pageState === "Saved" && <Saved />}
        {pageState === "Permissions" && <Permissions />}
      </Box>
    </>
  );
}
