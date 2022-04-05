import { createSlice } from "@reduxjs/toolkit";

export interface PostData {
  postId: string;
  userId: string;
  date: number;
  caption: string;
  image: string;
  likes: string[];
  comments: CommentData[];
}

export interface CommentData {
  userId: string;
  date: number;
  content: string;
  likes: string[];
}

interface SliceState {
  data: PostData[];
}

const postsSlice = createSlice({
  name: "posts",
  initialState: { data: [] } as SliceState,
  reducers: {
    populatePosts(state, action) {
      state.data = action.payload;
    },
    addNewPost(state, action) {
      state.data.unshift(action.payload);
    },
  },
});

export const { populatePosts, addNewPost } = postsSlice.actions;
export default postsSlice.reducer;
