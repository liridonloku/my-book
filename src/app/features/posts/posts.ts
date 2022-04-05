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
    likePost(state, action) {
      state.data = state.data.map((post) => {
        if (post.postId === action.payload.postId) {
          post.likes.push(action.payload.userId);
          return post;
        }
        return post;
      });
    },
    unlikePost(state, action) {
      state.data = state.data.map((post) => {
        if (post.postId === action.payload.postId) {
          post.likes = post.likes.filter((id) => id !== action.payload.userId);
          return post;
        }
        return post;
      });
    },
  },
});

export const { populatePosts, addNewPost, likePost, unlikePost } =
  postsSlice.actions;
export default postsSlice.reducer;
