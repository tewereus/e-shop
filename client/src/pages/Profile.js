import React, { useState } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Container from '../components/Container'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile } from '../features/user/userSlice'
import { FiEdit } from 'react-icons/fi'

const regexPhoneNumber = /(0[3|5|7|8|9])+([0-9]{8})\b/g;

let profileSchema = yup.object({
   firstname: yup.string().required('First Name is required'),
   lastname: yup.string().required('Last Name is required'),
   email: yup.string().email('Email is not valid').required('Email is required'),
   mobile: yup.string().required('Mobile Number is required').matches(regexPhoneNumber, 'Mobile Number is not valid'),
});

const Profile = () => {
   const getTokenFromLocalStorage = localStorage.getItem('customer') ? JSON.parse(localStorage.getItem('customer')) : null

   const config2 = {
      headers: {
         'Authorization': `Bearer ${getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""}`,
         'Accept': 'application/json'
      }
   }

   const dispatch = useDispatch();
   const userState = useSelector(state => state.auth.user)
   const [edit, setEdit] = useState(true)

   const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
         firstname: userState?.firstname,
         lastname: userState?.lastname,
         email: userState?.email,
         mobile: userState?.mobile,
      },
      validationSchema: profileSchema,
      onSubmit: (values) => {
         dispatch(updateProfile({ data: values, config2: config2 }))
         setEdit(true)
      },
   });

   return (
      <>
         <BreadCrumb title='My Profile' />
         <Container class1="cart-wrapper home-wrapper-2 py-5">
            <div className="row">
               <div className="col-12">
                  <div className="d-flex justify-content-between align-item-center">
                     <h3 className='my-3'>Update Profile</h3>
                     <FiEdit className='fs-3' onClick={() => setEdit(false)} />
                  </div>
               </div>
               <div className="col-12">
                  <form onSubmit={formik.handleSubmit}>
                     <div className="mb-3">
                        <label htmlFor="example1" className="form-label">First Name</label>
                        <input
                           type="text"
                           name='firstname'
                           className="form-control"
                           id="example1"
                           onChange={formik.handleChange('firstname')}
                           onBlur={formik.handleBlur('firstname')}
                           value={formik.values.firstname}
                           disabled={edit}
                        />
                        <div className="error">
                           {
                              formik.touched.firstname && formik.errors.firstname
                           }
                        </div>
                     </div>
                     <div className="mb-3">
                        <label htmlFor="example2" className="form-label">Last Name</label>
                        <input
                           type="text"
                           name='lastname'
                           className="form-control"
                           id="example2"
                           onChange={formik.handleChange('lastname')}
                           onBlur={formik.handleBlur('lastname')}
                           value={formik.values.lastname}
                           disabled={edit}
                        />
                        <div className="error">
                           {
                              formik.touched.lastname && formik.errors.lastname
                           }
                        </div>
                     </div>
                     <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input
                           type="email"
                           name='email'
                           className="form-control"
                           id="exampleInputEmail1"
                           onChange={formik.handleChange('email')}
                           onBlur={formik.handleBlur('email')}
                           value={formik.values.email}
                           disabled={edit}
                        />
                        <div className="error">
                           {
                              formik.touched.email && formik.errors.email
                           }
                        </div>
                     </div>
                     <div className="mb-3">
                        <label htmlFor="example3" className="form-label">Mobile Number</label>
                        <input
                           type="tel"
                           name='mobile'
                           className="form-control"
                           id="example3"
                           onChange={formik.handleChange('mobile')}
                           onBlur={formik.handleBlur('mobile')}
                           value={formik.values.mobile}
                           disabled={edit}
                        />
                        <div className="error">
                           {
                              formik.touched.mobile && formik.errors.mobile
                           }
                        </div>
                     </div>
                     {
                        edit === false
                        &&
                        <button type="submit" className="btn btn-primary">Save</button>
                     }
                  </form>
               </div>
            </div>
         </Container>
      </>
   )
}

export default Profile