/** global chrome */
const regeneratorRuntime = require("regenerator-runtime");

import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import GitHubClient from "../data";
import RepoSection from "./components/RepoSection";
import Header from "./components/Header";
import Loading from "./components/Loading";
import { getStorage, addRepository, setStorage, clearStorage, removeRepository, setToken, getToken, getRepositories } from "../data/chromeStorage";

function Popup() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false); // TODO display error

  // On popup load, we need to fetch all the PRs
  useEffect(() => {
    async function getPRs() {
      try {
        setLoading(true);

        const token = await getToken();
        const client = new GitHubClient(token)
        
        const repos = await getRepositories();
        const reposData = await client.getRepoData(repos);

        setData(reposData)
        setLoading(false);
      } catch (e) {
        console.error(e);
        setLoading(false);
        setData(null);
      }
    }
    getPRs();
  }, []);

  console.log("loading", loading)
  return (
    <>
      <CssBaseline />
      <Stack
        spacing={0}
        padding={0}
        width="100%"
        alignItems="flex-start"
        bgcolor="white"
      >
        <Header />

        {/* Space out each repo section */}
        <Stack spacing={3} width="100%">
          {loading && <Loading />}
          {/* TODO error message when fetching */}
          {data && data.length > 0 && data.map((repo, index) => {
            return (
              <RepoSection
                key={index}
                repo={repo}
              />
            );
          })}
          {/* TODO Nothing to show when data.length === 0 */}
        </Stack>
      </Stack>
    </>
  );
}

render(<Popup />, document.getElementById("root"));
