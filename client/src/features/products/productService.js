import axios from 'axios'
import { base_url, config } from '../../utils/axiosconfig'

const getProducts = async (data) => {
   const response = await axios.get(
      `${base_url}product?page=1&limit=30&${data?.brand ? `brand=${data.brand}&` : ""}${data?.tag ? `tags=${data.tag}&` : ""}${data?.category ? `category=${data.category}&` : ""}${data?.minPrice ? `price[gte]=${data.minPrice}&` : ""}${data?.maxPrice ? `price[lte]=${data.maxPrice}&` : ""}${data?.sort ? `sort=${data.sort}&` : ""}`
   )
   if (response.data) {
      return response.data
   }
}

const getSingleProduct = async (id) => {
   const response = await axios.get(`${base_url}product/${id}`)
   if (response.data) {
      return response.data
   }
}

const addToWishList = async (data) => {
   const prodId = data.id
   const response = await axios.put(`${base_url}product/wishlist`, { prodId }, data.config2)
   if (response.data) {
      return response.data
   }
}

const rateProduct = async (data) => {
   const response = await axios.put(`${base_url}product/rating`, { star: data.star, comment: data.comment, prodId: data.prodId }, data.config2)
   if (response.data) {
      return response.data
   }
}

export const productService = {
   getProducts,
   addToWishList,
   getSingleProduct,
   rateProduct,
}