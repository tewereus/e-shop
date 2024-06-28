import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import { blogService } from './blogService';

export const getAllBlog = createAsyncThunk('blogs/get', async (thunkAPI) => {
   try {
      return await blogService.getBlogs()
   } catch (error) {
      return thunkAPI.rejectWithValue(error)
   }
})

export const getABlog = createAsyncThunk('blog/get', async (id, thunkAPI) => {
   try {
      return await blogService.getBlog(id)
   } catch (error) {
      return thunkAPI.rejectWithValue(error)
   }
})

const initialState = {
   blog: '',
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: '',
}

export const blogSlice = createSlice({
   name: 'blog',
   initialState: initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getAllBlog.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getAllBlog.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.message = "Success";
            state.blog = action.payload;
         })
         .addCase(getAllBlog.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
         })
         .addCase(getABlog.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getABlog.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.message = "Success";
            state.singleBlog = action.payload;
         })
         .addCase(getABlog.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
         })
   }
})

export default blogSlice.reducer;