import { createSlice } from "@reduxjs/toolkit";

interface FriendRequest {
  senderId: string;
  receiverId: string;
  status: string;
  date: Date;
}

interface SliceState {
  sent: FriendRequest[];
  received: FriendRequest[];
}

const friendRequestsSlice = createSlice({
  name: "friendRequests",
  initialState: { sent: [], received: [] } as SliceState,
  reducers: {
    populateSentRequests(state, action) {
      state.sent = action.payload;
    },
    addNewSentRequest(state, action) {
      state.sent = [...state.sent, action.payload];
    },
    cancelSentRequest(state, action) {
      state.sent = state.sent.filter(
        (request) => request.receiverId !== action.payload
      );
    },
    populateReceivedRequests(state, action) {
      state.received = action.payload;
    },
    removeReceivedRequest(state, action) {
      state.received = state.received.filter(
        (request) => request.senderId !== action.payload
      );
    },
    resetStateFriendRequests(state) {
      state.sent = [];
      state.received = [];
    },
  },
});

export const {
  populateSentRequests,
  addNewSentRequest,
  cancelSentRequest,
  populateReceivedRequests,
  removeReceivedRequest,
  resetStateFriendRequests,
} = friendRequestsSlice.actions;
export default friendRequestsSlice.reducer;
