import { createSlice, createAsyncThunk, createAction, current } from '@reduxjs/toolkit'
import enquiryService from './enquiryService';


export const getEnquiries = createAsyncThunk('enquiry/get-enquiries', async (thunkAPI) => {
   try {
      return await enquiryService.getEnquiries();
   } catch (error) {
      return thunkAPI.rejectWithValue(error)
   }
})

export const deleteAnEnquiry = createAsyncThunk(
   "enquiry/delete-enquiry",
   async (id, thunkAPI) => {
      try {
         return await enquiryService.deleteEnquiry(id);
      } catch (error) {
         return thunkAPI.rejectWithValue(error);
      }
   }
);

export const getAnEnquiry = createAsyncThunk(
   "enquiry/get-enquiry",
   async (id, thunkAPI) => {
      try {
         return await enquiryService.getEnquiry(id);
      } catch (error) {
         return thunkAPI.rejectWithValue(error);
      }
   }
);

export const updateAnEnquiry = createAsyncThunk(
   "enquiry/update-enquiry",
   async (enq, thunkAPI) => {
      try {
         return await enquiryService.udpateEnquiry(enq);
      } catch (error) {
         return thunkAPI.rejectWithValue(error);
      }
   }
);

export const resetState = createAction("Reset_all");

const initialState = {
   enquiries: [],
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: "",
}

export const enquirySlice = createSlice({
   name: "enquiries",
   initialState,
   reducer: {},
   extraReducers: (builder) => {
      builder
         .addCase(getEnquiries.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getEnquiries.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.enquiries = action.payload;
         })
         .addCase(getEnquiries.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
         })
         .addCase(deleteAnEnquiry.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(deleteAnEnquiry.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.deletedEnquiry = action.payload;
         })
         .addCase(deleteAnEnquiry.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
         })
         .addCase(getAnEnquiry.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getAnEnquiry.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.enqName = action.payload.name;
            state.enqMobile = action.payload.mobile;
            state.enqEmail = action.payload.email;
            state.enqComment = action.payload.comment;
            state.enqStatus = action.payload.status;
         })
         .addCase(getAnEnquiry.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
         })
         .addCase(updateAnEnquiry.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(updateAnEnquiry.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.updatedEnquiry = action.payload;
         })
         .addCase(updateAnEnquiry.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
         })
         .addCase(resetState, () => initialState);
   }
})

export default enquirySlice.reducer