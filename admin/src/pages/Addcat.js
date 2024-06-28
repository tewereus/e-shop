import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { createCategory, getAProductCategory, resetState, updateAProductCategory } from '../features/pcategory/pcategorySlice';

let schema = yup.object().shape({
   title: yup.string().required('Category Name is required'),
});

const Addcat = () => {
   const dispatch = useDispatch();
   const location = useLocation();
   const navigate = useNavigate();
   const getPCatId = location.pathname.split('/')[3];
   const newCategory = useSelector((state) => state.pCategory)
   const { isSuccess, isError, isLoading, createdCategory, pCategoryName, updatedProductCategory } = newCategory;

   useEffect(() => {
      if (getPCatId !== undefined) {
         dispatch(getAProductCategory(getPCatId))
      } else {
         dispatch(resetState())
      }
   }, [getPCatId])

   useEffect(() => {
      if (isSuccess && createdCategory) {
         toast.success('Category Added Successfully!');
      }
      if (isSuccess && updatedProductCategory) {
         toast.success('Product Category Updated Successfully!');
         navigate('/admin/list-category')
      }
      if (isError) {
         toast.error('Something Went Wrong!');
      }
   }, [isSuccess, isError, isLoading])

   const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
         title: pCategoryName || "",
      },
      validationSchema: schema,
      onSubmit: (values) => {
         if (getPCatId !== undefined) {
            const data = { id: getPCatId, pCatData: values }
            dispatch(updateAProductCategory(data))
            dispatch(resetState())
         } else {
            dispatch(createCategory(values));
            formik.resetForm();
            setTimeout(() => {
               dispatch(resetState())
            }, 500)
         }
      },
   });

   return (
      <div>
         <h3 className="mb-4 title">{getPCatId !== undefined ? "Edit" : "Add"} Category</h3>
         <div>
            <form action="" onSubmit={formik.handleSubmit}>

               <CustomInput type='text' label='Enter Product Category' name='title' onChng={formik.handleChange('title')} onBlr={formik.handleBlur('title')} val={formik.values.title} />
               <div className="error">
                  {formik.touched.title && formik.errors.title}
               </div>

               <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>{getPCatId !== undefined ? "Edit" : "Add"} Category</button>
            </form>
         </div>
      </div>
   )
}

export default Addcat