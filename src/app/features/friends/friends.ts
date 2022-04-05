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
    removeFriend(state, action) {
      state.data = state.data.filter((id) => id !== action.payload);
    },
    resetStateFriends(state) {
      state.data = [];
    },
  },
});

export const {
  populateFriendsList,
  addFriend,
  removeFriend,
  resetStateFriends,
} = friendsSlice.actions;
export default friendsSlice.reducer;
