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
  },
});

export const { populateFriendsList } = friendsSlice.actions;
export default friendsSlice.reducer;
