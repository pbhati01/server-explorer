import { useState, useEffect, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { ServerList, setServerList } from "../../store/serverListSlice";
import { AuthState, setToken } from "../../store/authSlice";

function ServerListDetails() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);

  useEffect(() => {
    fetchServerData(token);
  }, [])

  const fetchServerData = async (token :string) => {
    const resp = await fetch("https://playground.tesonet.lt/v1/servers", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'Host': 'api.producthunt.com'
      }
    });
    const respData:ServerList = await resp.json();
    console.log('respData :>> ', respData);
    dispatch(setServerList(respData))
  };

  return (
    <div className="container flex">
      Server Data
    </div>
  );
}

export default ServerListDetails;
