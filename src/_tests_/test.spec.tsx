import { render } from "@testing-library/react";
import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "../store/store";
import App from "../App";
import Login from "../components/Login";
import ServerListDetails from "../components/ServerListDetails";
import { setToken } from "../store/authSlice";
import "cross-fetch/polyfill";

const renderLogin = () =>
  render(
    <Provider store={store}>
      <Login />
    </Provider>
  );

const renderServeListDetails = () =>
  render(
    <Provider store={store}>
      <ServerListDetails />
    </Provider>
  );

describe("Test Login Component", () => {
  beforeEach(() => renderLogin());
  test("Has login and password inputs", () => {
    const username = screen.getByTestId("username");
    const password = screen.getByTestId("password");

    expect(username).toBeDefined();
    expect(password).toBeDefined();
  });

  test("On User click on login button should be disabled", async () => {
    // const user = userEvent();
    const username = screen.getByTestId("username");
    const password = screen.getByTestId("password");
    const loginBtn = screen.getByTestId("login-btn");
    await userEvent.type(username, "tesonet");
    await userEvent.type(password, "partyanimal");
    await userEvent.click(loginBtn);
    expect(loginBtn).toBeDisabled();
    await waitFor(() => expect(loginBtn).toBeEnabled());
  });

  test("Post login state should  be set with token", async () => {
    const token = store.getState().auth.token;
    expect(token).not.toBeNull();
  });
});

describe("Test Server List Component", () => {
  beforeEach(() => renderServeListDetails());
  test("On Successful login should render server list details", async () => {
    const pageTitle = screen.getByTestId("server-page-heading");
    expect(pageTitle).toHaveTextContent("Server Details");
  });

  test("Should render server data with valid token", async () => {
    const tbody = screen.getByTestId("tbody");
    expect(tbody).toContainHTML("<tr>");
  });

  test("Should not render server with invalid token", async () => {
    store.dispatch(setToken({ token: "test" }));
    const tbody = screen.getByTestId("tbody");
    expect(tbody).toContainHTML("");
  });
});
