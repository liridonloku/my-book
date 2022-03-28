import { createSlice } from "@reduxjs/toolkit";

interface Data {
  name: string;
  id: string;
  email: string;
  photoUrl: string;
  friendsList: Array<{ id: string }>;
}

interface SliceState {
  data: Data[];
}

const peopleSlice = createSlice({
  name: "people",
  initialState: { data: [] } as SliceState,
  reducers: {
    addPeople(state, action) {
      console.log("hey");
      state.data = action.payload;
    },
  },
});

export const { addPeople } = peopleSlice.actions;
export default peopleSlice.reducer;
