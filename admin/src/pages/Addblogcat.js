import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { createBlogCategory, getABlogCat, resetState, updateABlogCat } from '../features/bcategory/bcategorySlice';

let schema = yup.object().shape({
   title: yup.string().required('Blog Category is required'),
});

const Addblogcat = () => {
   const dispatch = useDispatch();
   const location = useLocation();
   const navigate = useNavigate();
   const getBlogCatId = location.pathname.split('/')[3];
   const newBlogCategory = useSelector((state) => state.bCategory)
   const { isSuccess, isError, isLoading, createdBlogCategory, blogCategoryName, updatedBlogCategory } = newBlogCategory;

   useEffect(() => {
      if (getBlogCatId !== undefined) {
         dispatch(getABlogCat(getBlogCatId))
      } else {
         dispatch(resetState())
      }
   }, [getBlogCatId])


   useEffect(() => {
      if (isSuccess && createdBlogCategory) {
         toast.success('Blog Category Added Successfully!');
      }
      if (isSuccess && updatedBlogCategory) {
         toast.success('Blog Category Updated Successfully!');
         navigate('/admin/list-blog-category')
      }
      if (isError) {
         toast.error('Something Went Wrong!');
      }
   }, [isSuccess, isError, isLoading])

   const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
         title: blogCategoryName || "",
      },
      validationSchema: schema,
      onSubmit: (values) => {
         if (getBlogCatId !== undefined) {
            const data = { id: getBlogCatId, blogCatData: values }
            dispatch(updateABlogCat(data))
            dispatch(resetState())
         } else {
            dispatch(createBlogCategory(values));
            formik.resetForm();
            setTimeout(() => {
               dispatch(resetState())
            }, 500)
         }
      },
   });

   return (
      <div>
         <h3 className="mb-4 title">{getBlogCatId !== undefined ? "Edit" : "Add"} Blog Category</h3>
         <div>
            <form action="" onSubmit={formik.handleSubmit}>

               <CustomInput type='text' label='Enter Blog Category' name='title' onChng={formik.handleChange('title')} onBlr={formik.handleBlur('title')} val={formik.values.title} id='blogcat' />
               <div className="error">
                  {formik.touched.title && formik.errors.title}
               </div>

               <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>{getBlogCatId !== undefined ? "Edit" : "Add"} Blog Category</button>
            </form>
         </div>
      </div >
   )
}

export default Addblogcat