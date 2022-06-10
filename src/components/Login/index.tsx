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
      body: JSON.stringify(requestData),
    });
    const respData: AuthState = await resp.json();
    console.log("respData :>> ", respData);
    dispatch(setToken(respData));
  };

  return (
    <section className="h-full gradient-form bg-gray-200 md:h-screen">
      <div className="py-12 px-6 h-full">
        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
          <div className="xl">
            <div className="block bg-white shadow-lg rounded-lg">
              <div className="lg:flex lg:flex-wrap ">
                <div className="lg px-4 md:px-0">
                  <div className="md:p-12 md:mx-6 py-5">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label htmlFor="uname">User:</label>
                        <input
                          type="text"
                          name="username"
                          id="uname"
                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          placeholder="Enter Username"
                        />
                      </div>
                      <div className="mb-4">
                      <label htmlFor="password">Password:</label>
                        <input
                          type="password"
                          name="password"
                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id="password"
                          placeholder="Enter Password"
                        />
                      </div>
                      <div className="text-center pt-1 mb-12 pb-1">
                        <button
                          className="inline-block px-6 py-2.5 text-black font-medium text-xs leading-tight uppercase rounded shadow-md bg-blue-400 hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                          type="submit"
                          data-mdb-ripple="true"
                          data-mdb-ripple-color="light"
                        >
                          Log in
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
