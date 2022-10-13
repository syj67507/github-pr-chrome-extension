/** global chrome */
const regeneratorRuntime = require("regenerator-runtime");

import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import GitHubClient from "../../../data";
import RepoSection from "./RepoSection";
import Loading from "../Loading";
import { getToken, getRepositories } from "../../../data/chromeStorage";

export default function Popup() {
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

  return (
    <>
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
    </>
  );
}
