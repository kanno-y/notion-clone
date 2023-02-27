import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: {} };
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setuser } = userSlice.actions;

export default userSlice.reducer;
