import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "./features/user/user";
import peopleReducer from "./features/people/people";
import friendsReducer from "./features/friends/friends";

export const store = configureStore({
  reducer: {
    user: userReducer,
    people: peopleReducer,
    friends: friendsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
