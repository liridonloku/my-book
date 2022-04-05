import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Data {
  postId: string;
  userId: string;
  date: number;
  caption: string;
  image: string;
  likes: string[];
  comments: Comment[];
}

interface Comment {
  user: string;
  date: number;
  content: string;
  likes: string[];
}

interface SliceState {
  data: Data[];
}

const postsSlice = createSlice({
  name: "posts",
  initialState: { data: [] } as SliceState,
  reducers: {
    populatePosts(state, action: PayloadAction<Data[]>) {
      state.data = action.payload;
    },
    addNewPost(state, action: PayloadAction<Data>) {
      state.data.unshift(action.payload);
    },
  },
});

export const { populatePosts, addNewPost } = postsSlice.actions;
export default postsSlice.reducer;
