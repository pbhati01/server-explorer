import { store } from "../store/store";
import { setToken } from "../store/authSlice";
import { setServerList } from "../store/serverListSlice";

const sampleServerList = [
  {
    "name": "Singapore #94",
    "distance": 612
  },
  {
    "name": "Japan #41",
    "distance": 56
  },
  {
    "name": "United Kingdom #71",
    "distance": 497
  }
];

describe("Redux Action Tests", () => {
  test("set token in state", () => {
    let prevTokenState = store.getState().auth.token;
    expect(prevTokenState).toBeNull();

    store.dispatch(setToken({ token: "test token" }));
    let newTokenState = store.getState().auth.token;
    expect(newTokenState).toBe("test token");
  });

  test("set server data in state", () => {
    let prevServerDataState = store.getState().serverData.serverList;
    expect(prevServerDataState).toEqual([]);

    store.dispatch(setServerList([...sampleServerList]));
    let newServerDataState = store.getState().serverData.serverList;
    expect(JSON.stringify(newServerDataState)).toEqual(JSON.stringify(sampleServerList))
  });
});
