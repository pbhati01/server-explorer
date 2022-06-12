import { useState, useEffect, FormEvent, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  ServerData,
  ServerList,
  setServerList,
} from "../../store/serverListSlice";
import * as Icons from "heroicons-react";

function ServerListDetails() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const serverList = useAppSelector((state) => state.serverData.serverList);
  const [serverListData, setServerListData] = useState<ServerList>([]);
  const [sortOrder, setSortOrder] = useState<String>("asc");
  const [sortKey, setSortKey] = useState<String>("name");

  const debounce = <T extends (...args: any[]) => any>(
    callback: T,
    waitFor: number
  ) => {
    let timeout: any;
    return (...args: Parameters<T>): ReturnType<T> => {
      let result: any;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        result = callback(...args);
      }, waitFor);
      return result;
    };
  };

  const filterSearchList = (searchValue: string) => {
    const updatedServerList = serverList.filter((server: ServerData) => {
      return (
        server.name.indexOf(searchValue) !== -1 ||
        server.distance?.toString().indexOf(searchValue) !== -1
      );
    });
    setServerListData(updatedServerList);
  };

  const handleSearch = useCallback(debounce(filterSearchList, 500), []);

  const handleSorting = (key: string, sortingOrder: string) => {
    const order = sortingOrder === "asc" ? "desc" : "asc";
    let sortedList = [...serverListData];
    sortedList.sort((a: ServerData, b: ServerData) => {
      let x, y;
      if (key === "name") {
        x = a.name.toLowerCase();
        y = b.name.toLowerCase();
      } else {
        x = a.distance;
        y = b.distance;
      }

      if (order === "asc") {
        return x > y ? -1 : 1;
      } else {
        return y > x ? -1 : 1;
      }
    });
    setServerListData(sortedList);
    setSortKey(key);
    setSortOrder(sortingOrder);
  };

  useEffect(() => {
    token && fetchServerData(token);
  }, [token]);

  useEffect(() => {
    setServerListData(serverList);
  }, [serverList]);

  const fetchServerData = async (token: string) => {
    const resp = await fetch("https://playground.tesonet.lt/v1/servers", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        Host: "api.producthunt.com",
      },
    });
    const respData: ServerList = await resp.json();
    dispatch(setServerList(respData));
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-6/12 m-auto">
      <div className="p-4">
        <h5
          className="font-medium leading-tight text-xl mt-0 mb-5 text-blue-900"
          data-testid="server-page-heading"
        >
          Server Details
        </h5>
        <div className="relative mt-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            datatest-id="table-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 align-middle">
              <span className="inline-flex">
                Name
                {sortOrder === "asc" ? (
                  <Icons.ChevronDoubleDown
                    className="h-5 w-5 mx-2 text-black-500"
                    onClick={() => handleSorting("name", "desc")}
                  />
                ) : (
                  <Icons.ChevronDoubleUp
                    className="h-5 w-5 mx-2 text-black-500"
                    onClick={() => handleSorting("name", "asc")}
                  />
                )}
              </span>
            </th>
            <th scope="col" className="px-6 py-3 align-middle">
              <span className="inline-flex">
                Distance
                {sortOrder === "asc" ? (
                  <Icons.ChevronDoubleDown
                    className="h-5 w-5 mx-2 text-black-500"
                    onClick={() => handleSorting("distance", "desc")}
                  />
                ) : (
                  <Icons.ChevronDoubleUp
                    className="h-5 w-5 mx-2 text-black-500"
                    onClick={() => handleSorting("distance", "asc")}
                  />
                )}
              </span>
            </th>
          </tr>
        </thead>
        <tbody data-testid="tbody">
          {serverListData.map((server: ServerData) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
              >
                {server.name}
              </th>
              <td className="px-6 py-4">{server.distance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ServerListDetails;
