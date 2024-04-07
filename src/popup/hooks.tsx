import { useEffect, useState } from "react";
import {
  type Filters,
  getFilterOptions,
  getRepositories,
  getToken,
  setBadge,
} from "../data/extension";
import GitHubClient, { type RepoData } from "../data";

/**
 * A hook to fetch the currently saved filtering options that was previously
 * set by the user. If the call fails, then the default configuration
 * for the filtering options will be returned instead
 * @returns Returns a loadingFilters state variable, the filters themselves, and a setter for the filters
 */
export function useSavedFilters() {
  const defaultFilters: Filters = {
    textFilter: "",
    includeDrafts: true,
    showMine: false,
  };

  const [loadingFilters, setLoadingFilters] = useState(true);
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  useEffect(() => {
    async function getFilters() {
      setLoadingFilters(true);
      const savedFilters = await getFilterOptions();
      setFilters(savedFilters);
      setLoadingFilters(false);
    }
    getFilters().catch((e) => {
      setLoadingFilters(false);
      setFilters(defaultFilters);
      console.error(e);
    });
  }, []);

  return { loadingFilters, filters, setFilters };
}

/**
 * A hook to fetch all pull requests for each repo that was configured by the user
 * @returns Returns a loading state variable, the data, and the username
 */
export function useGetPullRequests() {
  const [username, setUsername] = useState("");
  const [data, setData] = useState<RepoData[] | null>(null);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(false); // TODO display error

  useEffect(() => {
    async function getPRs() {
      try {
        setLoading(true);

        const token = await getToken();
        const client = new GitHubClient(token);

        // Fetch data
        const storageRepos = await getRepositories();
        const userPromise = client.getAuthenticatedUser();
        const reposDataPromise = client.getRepoData(storageRepos);

        // Using promise all to make calls in parallel
        const [user, reposData] = await Promise.all([
          userPromise,
          reposDataPromise,
        ]);

        setUsername(user.username);
        setData(reposData);
        setLoading(false);

        // Updates the browser action badge
        let count = 0;
        reposData.forEach((repoData) => {
          count += repoData.pullRequests.length;
        });
        setBadge(count).catch((e) => {
          console.error(`failed to set the badge to ${count}`, e);
        });
      } catch (e) {
        console.error(e);
        setLoading(false);
        setData(null);
        setUsername("");
      }
    }
    getPRs().catch((e) => {
      console.error(`failed to getPRs()`, e);
    });
  }, []);

  return { username, data, loading };
}
