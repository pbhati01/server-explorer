import { render, fireEvent } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "../store/store";
import App from "../App";
import ServerListDetails from "../components/ServerListDetails";
import { setToken } from "../store/authSlice";
import "cross-fetch/polyfill";

describe("App", () => {
  test("Has login and password inputs", () => {
    const loginPage = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const username = screen.getByTestId("username");
    const password = screen.getByTestId("password");

    expect(username).toBeDefined();
    expect(password).toBeDefined();
  });

  test("User login should work", async () => {
    const loginPage = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const username = screen.getByTestId("username");
    const password = screen.getByTestId("password");
    const loginBtn = screen.getByTestId("login-btn");
    const loginForm = screen.getByTestId("login-form");
    fireEvent.change(username, { target: { value: "tesonet" } });
    fireEvent.change(password, { target: { value: "partyanimal" } });
    fireEvent.submit(loginForm);
    expect(loginBtn).toBeDisabled();
  });

  test("On Successful login should render server list details", async () => {
    let prevTokenState = store.getState().auth.token;
    expect(prevTokenState).toBe("");

    store.dispatch(setToken({ token: "test token" }));
    let newTokenState = store.getState().auth.token;
    expect(newTokenState).toBe("test token");

    const serverDetailsPage = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const pageTitle = screen.getByTestId("server-page-heading");
    expect(pageTitle).toHaveTextContent("Server Details");
  });

  test("Should render server data with valid token", async () => {
    let serverList = store.getState().serverData.serverList;
    store.dispatch(setToken({ token: "f9731b590611a5a9377fbd02f247fcdf" }));
    const serverDetailsPage = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const tbody = screen.getByTestId("tbody");
    expect(tbody).toContainHTML("<tr>")
  });

  test("Should not render server with invalid token", async () => {
    store.dispatch(setToken({ token: "test" }));
    const serverDetailsPage = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    let serverList = store.getState().serverData.serverList;
    const tbody = screen.getByTestId("tbody");
    expect(tbody).toHaveTextContent("")
  });
});
