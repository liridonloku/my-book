import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAuth } from "firebase/auth";
import { logInWithGoogle, logOutUser } from "../../firebase";
import { AppDispatch } from "../../store";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    id: "",
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

export const googleLogIn = async (dispatch: AppDispatch) => {
  await logInWithGoogle();
  let auth = getAuth();
  let name = auth.currentUser?.displayName || "";
  let id = auth.currentUser?.uid || "";
  let email = auth.currentUser?.email || "";
  let photoUrl = auth.currentUser?.photoURL || "";
  dispatch(login({ name, id, email, photoUrl }));
};

export const logOut = async (dispatch: AppDispatch) => {
  await logOutUser();
  dispatch(logout());
};
