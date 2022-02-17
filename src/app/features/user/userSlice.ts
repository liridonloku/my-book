import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { getAuth } from "firebase/auth";
import { logInWithGoogle, logOutUser } from "../../firebase";

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
    test(state) {
      console.log(state);
    },
  },
});

export const { login, logout, test } = userSlice.actions;
export default userSlice.reducer;

export const googleLogIn = async (
  dispatch: ActionCreatorWithPayload<{}> | ActionCreatorWithoutPayload
) => {
  await logInWithGoogle();
  let auth = getAuth();
  let name = auth.currentUser?.displayName || "";
  let id = auth.currentUser?.uid || "";
  let email = auth.currentUser?.email || "";
  let photoUrl = auth.currentUser?.photoURL || "";
  dispatch(login({ name, id, email, photoUrl }));
  dispatch(test());
};

export const logOut = () => {
  logOutUser();
  logout();
};
