import { createSlice } from "@reduxjs/toolkit";
import { publishPosts } from "../extraReducer";
const initialState = {
  loading: null,
  error: null,
  postLoading: null,
};

const postsSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(publishPosts.pending, (state) => {
        state.loading = true;
        state.postLoading = true;
      })
      .addCase(publishPosts.fulfilled, (state) => {
        state.postLoading = false;
      })
      .addCase(publishPosts.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});
export const { addCase } = postsSlice.actions;
export default postsSlice.reducer;
