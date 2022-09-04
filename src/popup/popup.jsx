/** global chrome */
const regeneratorRuntime = require("regenerator-runtime");

import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import GitHubClient from "../githubClient";
import RepoSection from "./components/RepoSection";
import Header from "./components/Header";
import Loading from "./components/Loading";

function Popup() {
  const [data, setData] = useState(null);

  // On popup load, we need to fetch all the PRs
  useEffect(async () => {
    // Create client to fetch data
    const storage = await chrome.storage.sync.get();
    const client = new GitHubClient(storage.token);
    
    // Fetch the saved repos
    let savedRepos = storage.savedRepos;
    if (!savedRepos) {
      savedRepos = [];
    }
    console.log("POPUP: savedRepos", savedRepos)

    // Fetch all the pull requests
    let allPullRequests = [];
    let count = 0;
    for (const repo of savedRepos) {
      const prs = await client.fetchPullRequests(repo);
      allPullRequests.push({ repo: repo, pullRequests: prs });
      count += prs.length;
    }
    setData(allPullRequests);
    chrome.action.setBadgeText({
      text: `${count}`,
    });
  }, []);

  useEffect(() => {
    console.log("TESTING")
    async function asdf() {
      const storage = await chrome.storage.sync.get();
      const client = new GitHubClient(storage.token);
      console.log("_getRepoData", await client._getRepoData({
        user: "syj67507",
        name: "discord-bot"
      }));
    }
    asdf().catch((e) => console.error(`asdf ${e}`))
  }, [])

  console.log("POPUP:", data);
  
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
          {data === null && <Loading />}
          {data && data.map((repoData, index) => {
            return (
              <RepoSection
                key={index}
                repo={repoData.repo}
                pullRequests={repoData.pullRequests}
              />
            );
          })}
        </Stack>
      </Stack>
    </>
  );
}

render(<Popup />, document.getElementById("root"));
