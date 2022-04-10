import regeneratorRuntime from "regenerator-runtime";
import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { Button, CssBaseline, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Add from "./components/Add";
import Saved from "./components/Saved";
import SavedRepo from "./components/Saved/SavedRepo";
import Permissions from "./components/Permissions";

function Options() {
  const [savedRepos, setSavedRepos] = useState([]);
  const [pageState, setPageState] = useState("Add");

  useEffect(async () => {
    const storage = await chrome.storage.sync.get();
    let savedRepos = storage.savedRepos;
    if (savedRepos === undefined) {
      console.log("Initializing saved repos...");
      savedRepos = [];
    }
    setSavedRepos(savedRepos);
  }, []);

  console.log("OPTIONS", savedRepos);

  return (
    <>
    <CssBaseline />
    <Box sx={{
      padding: 2,
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
    <Box sx={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
      {pageState === "Add" && <Add setSavedRepos={setSavedRepos} />}
      {pageState === "Saved" && <Saved savedRepos={savedRepos} setSavedRepos={setSavedRepos} />}
      {pageState === "Permissions" && <Permissions />}
    </Box>
    </>
  );
}

render(<Options />, document.getElementById("root"));
