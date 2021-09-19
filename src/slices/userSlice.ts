import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../constants/types";

const initialState: IUser = {
  isAuthenticated: false,
  username: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.username = "";
      state.isAuthenticated = false;
    },
    login: (state, { payload }) => {
      state.username = payload;
      state.isAuthenticated = true;
    },
  },
});

export const { logout, login } = userSlice.actions;

export default userSlice.reducer;
