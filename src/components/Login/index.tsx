import { useState, useEffect, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { AuthState, setToken } from "../../store/authSlice";

function Login() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formEle = e.currentTarget as HTMLFormElement;
    const formData = new FormData(formEle);
    const requestData = Object.fromEntries(formData.entries());
    console.log("requestData :>> ", requestData);
    const resp = await fetch("https://playground.tesonet.lt/v1/tokens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData)
    });
    const respData:AuthState = await resp.json();
    console.log('respData :>> ', respData);
    dispatch(setToken(respData))
  };

  return (
    <div className="container flex">
      <form onSubmit={handleSubmit}>
        <label htmlFor="uname">User:</label>
        <input name="username" id="uname" placeholder="Enter username" />
        <br />
        <label htmlFor="password">Password:</label>
        <input name="password" id="password" placeholder="Enter password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
