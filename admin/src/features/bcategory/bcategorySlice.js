import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import bCategoryService from './bcategoryService';


export const getCategories = createAsyncThunk('blogCategory/get-categories', async (thunkAPI) => {
   try {
      return await bCategoryService.getBlogCategories();
   } catch (error) {
      return thunkAPI.rejectWithValue(error)
   }
})

export const getABlogCat = createAsyncThunk('blogCategory/get-category', async (id, thunkAPI) => {
   try {
      return await bCategoryService.getBlogCategory(id);
   } catch (error) {
      return thunkAPI.rejectWithValue(error)
   }
})

export const createBlogCategory = createAsyncThunk('blogCategory/create-category', async (bcatData, thunkAPI) => {
   try {
      return await bCategoryService.createBlogCategory(bcatData);
   } catch (error) {
      return thunkAPI.rejectWithValue(error)
   }
})

export const updateABlogCat = createAsyncThunk('blogCategory/update-category', async (color, thunkAPI) => {
   try {
      return await bCategoryService.updateBlogCategory(color);
   } catch (error) {
      return thunkAPI.rejectWithValue(error)
   }
})

export const deleteABlogCat = createAsyncThunk('blogCategory/delete-category', async (id, thunkAPI) => {
   try {
      return await bCategoryService.deleteBlogCategory(id);
   } catch (error) {
      return thunkAPI.rejectWithValue(error)
   }
})

export const resetState = createAction('Reset_all')

const initialState = {
   bCategories: [],
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: "",
}

export const bCategorySlice = createSlice({
   name: "bCategories",
   initialState,
   reducer: {},
   extraReducers: (builder) => {
      builder
         .addCase(getCategories.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.bCategories = action.payload;
         })
         .addCase(getCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
         })
         .addCase(createBlogCategory.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(createBlogCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.createdBlogCategory = action.payload;
         })
         .addCase(createBlogCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
         })
         .addCase(getABlogCat.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getABlogCat.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.blogCategoryName = action.payload.title;
         })
         .addCase(getABlogCat.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
         })
         .addCase(updateABlogCat.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(updateABlogCat.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.updatedBlogCategory = action.payload;
         })
         .addCase(updateABlogCat.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
         })
         .addCase(deleteABlogCat.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(deleteABlogCat.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.deletedBlogCategory = action.payload;
         })
         .addCase(deleteABlogCat.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
         })
         .addCase(resetState, () => initialState)
   }
})

export default bCategorySlice.reducer