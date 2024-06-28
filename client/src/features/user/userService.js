import axios from 'axios'
import { base_url } from '../../utils/axiosconfig'

const getTokenFromLocalStorage = localStorage.getItem('customer') ? JSON.parse(localStorage.getItem('customer')) : null

export const config = {
   headers: {
      'Authorization': `Bearer ${getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""}`,
      'Accept': 'application/json'
   }
}

const register = async (userData) => {
   const response = await axios.post(`${base_url}user/register`, userData)
   if (response.data) {
      if (response.data) {
         localStorage.setItem('customer', JSON.stringify(response.data))
      }
      return response.data
   }
}

const login = async (userData) => {
   const response = await axios.post(`${base_url}user/login`, userData)
   if (response.data) {
      if (response.data) {
         localStorage.setItem('customer', JSON.stringify(response.data))
      }
      return response.data
   }
}

const getUserWishlist = async (data) => {
   const response = await axios.get(`${base_url}user/wishlist`, data)
   if (response.data) {
      return response.data
   }
}

const addToCart = async (cartData) => {
   const response = await axios.post(`${base_url}user/cart`, cartData, cartData.config2)
   if (response.data) {
      return response.data
   }
}

const getCart = async (data1) => {
   const response = await axios.get(`${base_url}user/cart`, data1)
   if (response.data) {
      return response.data
   }
}

const removeProductFromCart = async (data) => {
   const response = await axios.delete(`${base_url}user/delete-product-cart/${data.id}`, data.config2)
   if (response.data) {
      return response.data
   }
}

const updateProductFromCart = async (cartDetail) => {
   const response = await axios.delete(`${base_url}user/update-product-cart/${cartDetail.cartItemId}/${cartDetail.quantity}`, cartDetail.config2)
   if (response.data) {
      return response.data
   }
}

const createOrder = async (orderDetail) => {
   const response = await axios.post(`${base_url}user/cart/create-order`, orderDetail, orderDetail.config2)
   if (response.data) {
      return response.data
   }
}

const getUserOrders = async (data) => {
   const response = await axios.get(`${base_url}user/getmyorders`, data)
   if (response.data) {
      return response.data
   }
}

const updateUser = async (data) => {
   const response = await axios.put(`${base_url}user/edit-user`, data.data, data.config2)
   if (response.data) {
      return response.data
   }
}

const forgotPassToken = async (data) => {
   const response = await axios.post(`${base_url}user/forgot-password-token`, data)
   if (response.data) {
      return response.data
   }
}

const resetPass = async (data) => {
   const response = await axios.put(`${base_url}user/reset-password/${data.token}`, { password: data?.password })
   if (response.data) {
      return response.data
   }
}

const emptyCart = async (data) => {
   const response = await axios.delete(`${base_url}user/empty-cart`, data)
   if (response.data) {
      return response.data
   }
}

export const authService = {
   register,
   login,
   getUserWishlist,
   addToCart,
   getCart,
   removeProductFromCart,
   updateProductFromCart,
   createOrder,
   getUserOrders,
   updateUser,
   forgotPassToken,
   resetPass,
   emptyCart,
}