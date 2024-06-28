import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

const getUserfromLocalStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

const initialState = {
   user: getUserfromLocalStorage,
   orders: [],
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: "",
}

export const login = createAsyncThunk('auth/admin-login', async (user, thunkAPI) => {
   try {
      return await authService.login(user)
   } catch (error) {
      return thunkAPI.rejectWithValue(error)
   }
})

export const getOrders = createAsyncThunk('auth/get-orders', async (data, thunkAPI) => {
   try {
      return await authService.getOrders(data);
   } catch (error) {
      return thunkAPI.rejectWithValue(error)
   }
})

export const getOrderById = createAsyncThunk(
   "order/get-order",
   async (data, thunkAPI) => {
      try {
         return await authService.getOrder(data);
      } catch (error) {
         return thunkAPI.rejectWithValue(error);
      }
   }
);

export const updateAnOrder = createAsyncThunk(
   "order/update-order",
   async (data, thunkAPI) => {
      try {
         return await authService.updateOrder(data);
      } catch (error) {
         return thunkAPI.rejectWithValue(error);
      }
   }
);

export const getMonthlyData = createAsyncThunk(
   "orders/monthlydata",
   async (data, thunkAPI) => {
      try {
         return await authService.getMonthlyOrders(data);
      } catch (error) {
         return thunkAPI.rejectWithValue(error);
      }
   }
);

export const getYearlyData = createAsyncThunk(
   "orders/yearlydata",
   async (data, thunkAPI) => {
      try {
         return await authService.getYearlyStats(data);
      } catch (error) {
         return thunkAPI.rejectWithValue(error);
      }
   }
);

export const authSlice = createSlice({
   name: "auth",
   initialState: initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(login.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(login.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
            state.message = "success";
         })
         .addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
         })
         .addCase(getOrders.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getOrders.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.orders = action.payload;
            state.message = "success";
         })
         .addCase(getOrders.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
         })
         .addCase(getOrderById.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getOrderById.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.singleOrder = action.payload;
            state.message = "success";
         })
         .addCase(getOrderById.rejected, (state, action) => {
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            state.isLoading = false;
         })
         .addCase(getMonthlyData.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getMonthlyData.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.monthlyData = action.payload;
            state.message = "success";
         })
         .addCase(getMonthlyData.rejected, (state, action) => {
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            state.isLoading = false;
         })
         .addCase(getYearlyData.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getYearlyData.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.yearlyData = action.payload;
            state.message = "success";
         })
         .addCase(getYearlyData.rejected, (state, action) => {
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            state.isLoading = false;
         })
         .addCase(updateAnOrder.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(updateAnOrder.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.updatedOrderStatus = action.payload;
            state.message = "success";
         })
         .addCase(updateAnOrder.rejected, (state, action) => {
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            state.isLoading = false;
         })
   }
})

export default authSlice.reducer;