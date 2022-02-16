import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAuth } from "firebase/auth";
import { Dispatch } from "react";
import { useDispatch } from "react-redux";
import { logInWithGoogle, logOutUser } from "../../firebase";

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
      state.name = "";
      state.id = "";
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

export const googleLogIn = async (dispatch: any) => {
  await logInWithGoogle();
  let name = getAuth().currentUser?.displayName || "";
  let id = getAuth().currentUser?.uid || "";
  console.log(name, id);
  dispatch(login({ name, id }));
};

export const logOut = () => {
  logOutUser();
  logout();
};
