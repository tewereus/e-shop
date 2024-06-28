import React, { useEffect, useRef, useState } from 'react'
import CustomInput from '../components/CustomInput'
import ReactQuill from 'react-quill';
import { useLocation, useNavigate } from 'react-router-dom'
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux'
import { Select } from 'antd'
import Dropzone from 'react-dropzone'
import { getBrands } from '../features/brand/brandSlice';
import { getCategories } from '../features/pcategory/pcategorySlice';
import { getColors } from '../features/color/colorSlice';
import { delImg, uploadImg } from '../features/upload/uploadSlice';
import { createProduct, getAProduct, resetState, updateAProduct } from '../features/product/productSlice';

let schema = yup.object().shape({
   title: yup.string().required('Title is required'),
   description: yup.string().required('Description is required'),
   price: yup.number().required('Price is required'),
   brand: yup.string().required('Brand is required'),
   category: yup.string().required('Category is required'),
   tags: yup.string().required('Tag is required'),
   color: yup.array().min(1, 'Pick at least 1 color').required('Colors are required'),
   quantity: yup.number().required('Quantity is required'),
});

const Addproduct = () => {

   const effectRan = useRef(false)

   const dispatch = useDispatch();
   const navigate = useNavigate();
   const location = useLocation();
   const getProductId = location.pathname.split("/")[3];
   const [color, setColor] = useState([]);
   const [images, setImages] = useState([]);
   const brandState = useSelector((state) => state.brand?.brands)
   const pCatState = useSelector((state) => state.pCategory?.pCategories)
   const colorState = useSelector((state) => state.color?.colors)
   const imgState = useSelector((state) => state.upload?.images)
   const newProduct = useSelector((state) => state.product)
   const {
      isSuccess,
      isError,
      isLoading,
      createdProduct,
      productName,
      productDesc,
      productPrice,
      productBrand,
      productCategory,
      productTag,
      productColor,
      productQuantity,
      productImages,
      updatedProduct } = newProduct;

   useEffect(() => {
      if (getProductId !== undefined) {
         dispatch(getAProduct(getProductId));
         img.push(productImages);
      } else {
         dispatch(resetState());
      }
   }, [getProductId]);

   useEffect(() => {
      dispatch(resetState())
      dispatch(getBrands())
      dispatch(getCategories())
      dispatch(getColors())
   }, [])

   useEffect(() => {
      if (isSuccess && createdProduct) {
         toast.success("Product Added Successfullly!");
      }
      if (isSuccess && updatedProduct) {
         toast.success("Product Updated Successfullly!");
         navigate("/admin/list-product");
      }
      if (isError) {
         toast.error("Something Went Wrong!");
      }
   }, [isSuccess, isError, isLoading]);

   const coloropt = [];
   colorState.forEach((i) => {
      coloropt.push({
         label: i.title,
         value: i._id,
      });
   });
   useEffect(() => {
      formik.values.color = color ? color : " ";
   }, [color])

   const img = [];
   useEffect(() => {
      if (effectRan.current === true) {
         productImages?.forEach((i) => {
            img.push({
               public_id: i.public_id,
               url: i.url,
            });
         })
         formik.values.images = img;
      }
      return () => {
         effectRan.current = true
      }
      return () => { }
   }, [productImages]);

   imgState.forEach((i) => {
      img.push({
         public_id: i.public_id,
         url: i.url,
      })
   })

   useEffect(() => {
      if (effectRan.current === true) {
         formik.values.images = img;
      }
      return () => {
         effectRan.current = true
      }
   }, [imgState]);

   const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
         title: productName || "",
         description: productDesc || "",
         price: productPrice || "",
         brand: productBrand || "",
         category: productCategory || "",
         tags: productTag || "",
         color: productColor || "",
         quantity: productQuantity || "",
         images: productImages || "",
      },
      validationSchema: schema,
      onSubmit: (values) => {
         if (getProductId !== undefined) {
            const data = { id: getProductId, productData: values };
            dispatch(updateAProduct(data));
            dispatch(resetState());
         } else {
            dispatch(createProduct(values));
            formik.resetForm();
            setTimeout(() => {
               dispatch(resetState())
               navigate("/admin/list-product")
            }, 300);
         }
      },
   });

   const handleColors = (e) => {
      setColor(e)
   }
   return (
      <div>
         <h3 className="mb-4 title">{getProductId !== undefined ? "Edit" : "Add"} Products</h3>
         <div>
            <form onSubmit={formik.handleSubmit} className='d-flex gap-3 flex-column'>

               <CustomInput type='text' label='Enter Product Title' name='title' onChng={formik.handleChange('title')} onBlr={formik.handleBlur('title')} val={formik.values.title} />
               <div className="error">
                  {formik.touched.title && formik.errors.title}
               </div>

               <div className=''>
                  <ReactQuill
                     theme="snow" name='description' onChange={formik.handleChange('description')} value={formik.values.description}
                  />
               </div>
               <div className="error">
                  {formik.touched.description && formik.errors.description}
               </div>

               <CustomInput type='number' label='Enter Product Price' name='price' onChng={formik.handleChange('price')} onBlr={formik.handleBlur('price')} val={formik.values.price} />
               <div className="error">
                  {formik.touched.price && formik.errors.price}
               </div>

               <select name='brand' onChange={formik.handleChange('brand')} onBlur={formik.handleBlur('brand')} value={formik.values.brand} className='form-control py-3 mb-3' id="">
                  <option value="">Select Brand</option>
                  {brandState.map((i, j) => {
                     return (
                        <option key={j} value={i.title}>
                           {i.title}
                        </option>
                     )
                  })}
               </select>
               <div className="error">
                  {formik.touched.brand && formik.errors.brand}
               </div>

               <select name='category' onChange={formik.handleChange('category')} onBlur={formik.handleBlur('category')} value={formik.values.category} className='form-control py-3 mb-3' id="">
                  <option value="">Select Category</option>
                  {pCatState.map((i, j) => {
                     return (
                        <option key={j} value={i.title}>
                           {i.title}
                        </option>
                     )
                  })}
               </select>
               <div className="error">
                  {formik.touched.category && formik.errors.category}
               </div>

               <select name='tags' onChange={formik.handleChange('tags')} onBlur={formik.handleBlur('tags')} value={formik.values.tags} className='form-control py-3 mb-3' id="">
                  <option value="" disabled>Select Tag</option>
                  <option value="featured">Featured</option>
                  <option value="popular">Popular</option>
                  <option value="special">Special</option>
               </select>
               <div className="error">
                  {formik.touched.tags && formik.errors.tags}
               </div>

               <Select
                  mode='multiple'
                  allowClear
                  className='w-100'
                  placeholder='Select colors'
                  defaultValue={color}
                  onChange={(i) => handleColors(i)}
                  options={coloropt}
               />
               <div className="error">
                  {formik.touched.color && formik.errors.color}
               </div>

               <CustomInput type='number' label='Enter Product Quantity' name='quantity' onChng={formik.handleChange('quantity')} onBlr={formik.handleBlur('quantity')} val={formik.values.quantity} />
               <div className="error">
                  {formik.touched.quantity && formik.errors.quantity}
               </div>

               <div className="bg-white border-1 p-5 text-center">
                  <Dropzone onDrop={acceptedFiles => dispatch(uploadImg(acceptedFiles))}>
                     {({ getRootProps, getInputProps }) => (
                        <section>
                           <div {...getRootProps()}>
                              <input {...getInputProps()} />
                              <p>Drag 'n' drop some files here, or click to select files</p>
                           </div>
                        </section>
                     )}
                  </Dropzone>
               </div>
               <div className="showimages d-flex flex-wrap gap-3">
                  {imgState.map((i, j) => {
                     return (
                        <div className='position-relative' key={j}>
                           <button type='button' onClick={() => dispatch(delImg(i.public_id))} className="btn-close position-absolute" style={{ top: "10px", right: "10px" }}></button>
                           <img src={i.url} alt="" width={200} height={200} />
                        </div>
                     )
                  })}
               </div>

               <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>{getProductId !== undefined ? "Edit" : "Add"} Products</button>

            </form>
         </div>
      </div>
   )
}

export default Addproduct