import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { authService } from './userService'
import { toast } from 'react-toastify';

const getCustomerfromLocalStorage = localStorage.getItem('customer') ? JSON.parse(localStorage.getItem('customer')) : null;

export const registerUser = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
   try {
      return await authService.register(userData)
   } catch (error) {
      return thunkAPI.rejectWithValue(error)
   }
})

export const loginUser = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
   try {
      return await authService.login(userData)
   } catch (error) {
      return thunkAPI.rejectWithValue(error)
   }
})

export const getUserProductWishlist = createAsyncThunk('user/wishlist', async (data, thunkAPI) => {
   try {
      return await authService.getUserWishlist(data)
   } catch (error) {
      return thunkAPI.rejectWithValue(error)
   }
})

export const addProdToCart = createAsyncThunk('user/cart/add', async (cartData, thunkAPI) => {
   try {
      return await authService.addToCart(cartData)
   } catch (error) {
      return thunkAPI.rejectWithValue(error)
   }
})

export const createAnOrder = createAsyncThunk('user/cart/create-order', async (orderDetail, thunkAPI) => {
   try {
      return await authService.createOrder(orderDetail)
   } catch (error) {
      return thunkAPI.rejectWithValue(error)
   }
})

export const getUserCart = createAsyncThunk('user/cart/get', async (data, thunkAPI) => {
   try {
      return await authService.getCart(data)
   } catch (error) {
      return thunkAPI.rejectWithValue(error)
   }
})

export const getOrders = createAsyncThunk('user/order/get', async (data, thunkAPI) => {
   try {
      return await authService.getUserOrders(data)
   } catch (error) {
      return thunkAPI.rejectWithValue(error)
   }
})

export const deleteCartProduct = createAsyncThunk('user/cart/product/delete', async (data, thunkAPI) => {
   try {
      return await authService.removeProductFromCart(data)
   } catch (error) {
      return thunkAPI.rejectWithValue(error)
   }
})

export const deleteUserCart = createAsyncThunk('user/cart/delete', async (data, thunkAPI) => {
   try {
      return await authService.emptyCart(data)
   } catch (error) {
      return thunkAPI.rejectWithValue(error)
   }
})

export const updateCartProduct = createAsyncThunk('user/cart/product/update', async (cartDetail, thunkAPI) => {
   try {
      return await authService.updateProductFromCart(cartDetail)
   } catch (error) {
      return thunkAPI.rejectWithValue(error)
   }
})

export const updateProfile = createAsyncThunk('user/profile/update', async (data, thunkAPI) => {
   try {
      return await authService.updateUser(data)
   } catch (error) {
      return thunkAPI.rejectWithValue(error)
   }
})

export const forgotPasswordToken = createAsyncThunk('user/password/token', async (data, thunkAPI) => {
   try {
      return await authService.forgotPassToken(data)
   } catch (error) {
      return thunkAPI.rejectWithValue(error)
   }
})

export const resetPassword = createAsyncThunk('user/password/reset', async (data, thunkAPI) => {
   try {
      return await authService.resetPass(data)
   } catch (error) {
      return thunkAPI.rejectWithValue(error)
   }
})

export const resetState = createAction('Reset_all')

const initialState = {
   user: getCustomerfromLocalStorage,
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: '',
}

export const authSlice = createSlice({
   name: 'auth',
   initialState: initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(registerUser.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(registerUser.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.message = "Success";
            state.createdUser = action.payload;
            if (state.isSuccess === true) {
               toast.info('User Created Successfully')
            }
         })
         .addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if (state.isError === true) {
               toast.error(action.payload.response.data.message)
            }
         })
         .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(loginUser.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.message = "Success";
            state.user = action.payload;
            if (state.isSuccess === true) {
               localStorage.setItem('token', action.payload.token)
               toast.info('Login Successfully')
            }
         })
         .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if (state.isError === true) {
               toast.error(action.payload.response.data.message)
            }
         })
         .addCase(getUserProductWishlist.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getUserProductWishlist.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.message = "Success";
            state.wishlist = action.payload;
         })
         .addCase(getUserProductWishlist.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
         })
         .addCase(addProdToCart.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(addProdToCart.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.message = "Success";
            state.cartProduct = action.payload;
            if (state.isSuccess) {
               toast.success('Product Added To Cart')
            }
         })
         .addCase(addProdToCart.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
         })
         .addCase(getUserCart.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getUserCart.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.message = "Success";
            state.cartProducts = action.payload;
         })
         .addCase(getUserCart.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
         })
         .addCase(deleteCartProduct.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(deleteCartProduct.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.message = "Success";
            state.deletedCartProduct = action.payload;
            if (state.isSuccess) {
               toast.success('Product Deleted From Cart Successfully!')
            }
         })
         .addCase(deleteCartProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if (state.isSuccess == false) {
               toast.error('Something Went Wrong!')
            }
         })
         .addCase(updateCartProduct.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(updateCartProduct.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.message = "Success";
            state.updatedCartProduct = action.payload;
            if (state.isSuccess) {
               toast.success('Product Quantity Updated From Cart Successfully!')
            }
         })
         .addCase(updateCartProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if (state.isSuccess == false) {
               toast.error('Something Went Wrong!')
            }
         })
         .addCase(createAnOrder.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(createAnOrder.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.message = "Success";
            state.orderedProduct = action.payload;
            if (state.isSuccess) {
               toast.success('Ordered Successfully!')
            }
         })
         .addCase(createAnOrder.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if (state.isSuccess == false) {
               toast.error('Something Went Wrong! Maybe the Product is out stock, try again later!')
            }
         })
         .addCase(getOrders.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getOrders.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.message = "Success";
            state.getOrderedProduct = action.payload;
         })
         .addCase(getOrders.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
         })
         .addCase(updateProfile.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(updateProfile.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.message = "Success";
            state.updatedProfile = action.payload;
            if (state.isSuccess === true) {
               let currentUserData = JSON.parse(localStorage.getItem('customer'))
               let newUserData = {
                  _id: currentUserData?._id,
                  token: currentUserData?.token,
                  firstname: action?.payload?.firstname,
                  lastname: action?.payload?.lastname,
                  email: action?.payload?.email,
                  mobile: action?.payload?.mobile,
               }
               localStorage.setItem('customer', JSON.stringify(newUserData))
               state.user = newUserData
               toast.success('Updated Successfully!')
            }
         })
         .addCase(updateProfile.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if (state.isSuccess == false) {
               toast.error('Something Went Wrong!')
            }
         })
         .addCase(forgotPasswordToken.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(forgotPasswordToken.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.message = "Success";
            state.token = action.payload;
            if (state.isSuccess) {
               toast.success('Forgot Password Email Sent Successfully!')
            }
         })
         .addCase(forgotPasswordToken.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if (state.isSuccess == false) {
               toast.error('Something Went Wrong!')
            }
         })
         .addCase(resetPassword.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(resetPassword.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.message = "Success";
            state.pass = action.payload;
            if (state.isSuccess) {
               toast.success('Password Updated Successfully!')
            }
         })
         .addCase(resetPassword.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if (state.isSuccess == false) {
               toast.error('Something Went Wrong!')
            }
         })
         .addCase(deleteUserCart.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(deleteUserCart.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.message = "Success";
            state.deletedCart = action.payload;
         })
         .addCase(deleteUserCart.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
         })
         .addCase(resetState, () => initialState)
   }
})

export default authSlice.reducer;