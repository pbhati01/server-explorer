import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";//PayloadAction

// Define a type for the slice state
export interface AuthState {
  token: string | null;
}

// Define the initial state using that type
const initialState: AuthState = {
  token: null,
};

export const authSlice = createSlice({
  name: "authState",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
    },
  },
});

export const { setToken } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
//export const selectCount = (state: RootState) => state.authState.token;

export default authSlice.reducer;
