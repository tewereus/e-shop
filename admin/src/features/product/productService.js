import axios from 'axios'
import { base_url } from '../../utils/base_url'
import { config } from '../../utils/axiosconfig'

const getProducts = async () => {
   const response = await axios.get(`${base_url}product?page=1&limit=10`)
   return response.data;
}

const createProduct = async (product) => {
   const response = await axios.post(`${base_url}product/`, product, config)
   return response.data;
}

const updateProduct = async (product) => {
   const response = await axios.put(`${base_url}product/${product.id}`,
      {
         title: product.productData.title,
         description: product.productData.description,
         price: product.productData.price,
         brand: product.productData.brand,
         category: product.productData.category,
         tags: product.productData.tags,
         color: product.productData.color,
         quantity: product.productData.quantity,
         images: product.productData.images,
      },
      config
   );

   return response.data;
};

const getProduct = async (id) => {
   const response = await axios.get(`${base_url}product/${id}`, config);

   return response.data;
};

const deleteProduct = async (id) => {
   const response = await axios.delete(`${base_url}product/${id}`, config);

   return response.data;
};

const productService = {
   getProducts,
   createProduct,
   getProduct,
   updateProduct,
   deleteProduct
}

export default productService