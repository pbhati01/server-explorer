import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit"; //PayloadAction

// Define a type for the slice state
interface ServerData {
  name: string;
  distance: string;
}

export interface ServerList extends Array<ServerData> {}

// Define the initial state using that type
const initialState = {
  serverList: <ServerList>[],
};

export const serverListSlice = createSlice({
  name: "serverList",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setServerList: (state, action: PayloadAction<ServerList>) => {
      state.serverList = action.payload;
    },
  },
});

export const { setServerList } = serverListSlice.actions;

// Other code such as selectors can use the imported `RootState` type
//export const selectCount = (state: RootState) => state.ServerList.token;

export default serverListSlice.reducer;
