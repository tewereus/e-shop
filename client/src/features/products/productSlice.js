import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import { productService } from './productService';

export const getAllProduct = createAsyncThunk('product/get', async (data, thunkAPI) => {
   try {
      return await productService.getProducts(data)
   } catch (error) {
      return thunkAPI.rejectWithValue(error)
   }
})

export const getAProduct = createAsyncThunk('product/getAProduct', async (id, thunkAPI) => {
   try {
      return await productService.getSingleProduct(id)
   } catch (error) {
      return thunkAPI.rejectWithValue(error)
   }
})

export const addToWishlist = createAsyncThunk('product/wishlist', async (data, thunkAPI) => {
   try {
      return await productService.addToWishList(data)
   } catch (error) {
      return thunkAPI.rejectWithValue(error)
   }
})

export const addRating = createAsyncThunk('product/rating', async (data, thunkAPI) => {
   try {
      return await productService.rateProduct(data)
   } catch (error) {
      return thunkAPI.rejectWithValue(error)
   }
})

const initialState = {
   product: '',
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: '',
}

export const productSlice = createSlice({
   name: 'product',
   initialState: initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getAllProduct.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getAllProduct.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.message = "Success";
            state.product = action.payload;
         })
         .addCase(getAllProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
         })
         .addCase(addToWishlist.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(addToWishlist.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.message = "Product Added To Wishlist";
            state.addToWishlist = action.payload;
         })
         .addCase(addToWishlist.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
         })
         .addCase(getAProduct.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getAProduct.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.message = "Product Fetched Successfully";
            state.singleproduct = action.payload;
         })
         .addCase(getAProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
         })
         .addCase(addRating.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(addRating.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.message = "Rating Product Successfully";
            state.rating = action.payload;
            if (state.isSuccess) {
               toast.success("Rating Product Successfully")
            }
         })
         .addCase(addRating.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
         })
   }
})

export default productSlice.reducer;