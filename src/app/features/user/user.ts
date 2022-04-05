import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    id: "preloadUserID4567894564321",
    email: "",
    photoUrl: "",
  },
  reducers: {
    login(
      state,
      action: PayloadAction<{
        name: string;
        id: string;
        email: string;
        photoUrl: string;
      }>
    ) {
      for (let key in action.payload) {
        state[key as keyof typeof state] =
          action.payload[key as keyof typeof action.payload];
      }
    },
    logout(state) {
      state.name = "";
      state.id = "";
      state.email = "";
      state.photoUrl = "";
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
