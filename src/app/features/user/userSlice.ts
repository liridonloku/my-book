import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    id: "",
  },
  reducers: {
    login(state, action: PayloadAction<{ name: string; id: string }>) {
      state.name = action.payload.name;
      state.id = action.payload.id;
    },
    logout(state) {
      state = {
        name: "",
        id: "",
      };
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
