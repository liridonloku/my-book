import { createSlice } from "@reduxjs/toolkit";

export interface Data {
  name: string;
  id: string;
  email: string;
  photoUrl: string;
  friendList: Array<string>;
}

interface SliceState {
  data: Data[];
}

const peopleSlice = createSlice({
  name: "people",
  initialState: { data: [] } as SliceState,
  reducers: {
    addPeople(state, action) {
      state.data = action.payload;
    },
    changePersonPhoto(state, action) {
      state.data = state.data.map((person) => {
        if (person.id === action.payload.id) {
          person.photoUrl = action.payload.imageUrl;
          return person;
        }
        return person;
      });
    },
    resetStatePeople(state) {
      state.data = [];
    },
  },
});

export const { addPeople, resetStatePeople, changePersonPhoto } =
  peopleSlice.actions;
export default peopleSlice.reducer;
