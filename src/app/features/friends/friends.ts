import { createSlice } from "@reduxjs/toolkit";

interface SliceState {
  data: string[];
}

const friendsSlice = createSlice({
  name: "friends",
  initialState: { data: [] } as SliceState,
  reducers: {
    populateFriendsList(state, action) {
      state.data = action.payload;
    },
    addFriend(state, action) {
      state.data = state.data.concat(action.payload);
    },
  },
});

export const { populateFriendsList, addFriend } = friendsSlice.actions;
export default friendsSlice.reducer;
