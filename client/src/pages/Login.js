import React, { useEffect } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import { Link, useNavigate } from 'react-router-dom'
import Container from '../components/Container'
import CustomInput from '../components/CustomInput'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../features/user/userSlice'

let loginSchema = yup.object({
   email: yup.string().email('Email is not valid').required('Email is required'),
   password: yup.string().required('Password is required'),
});

const Login = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const formik = useFormik({
      initialValues: {
         email: '',
         password: '',
      },
      validationSchema: loginSchema,
      onSubmit: (values) => {
         dispatch(loginUser(values))
         formik.resetForm();
      },
   });

   const authState = useSelector((state) => state);
   const { user, isLoading, isError, isSuccess, message } = authState.auth;

   useEffect(() => {
      if (user !== null && isSuccess) {
         navigate('/')
      }
      else {
         navigate('')
      }
   }, [user, isError, isSuccess, isLoading])

   return (
      <>
         <Meta title={"Login"} />
         <BreadCrumb title="Login" />
         <Container class1="login-wrapper py-5 home-wrapper-2">
            <div className="row">
               <div className="col-12">
                  <div className="auth-card">
                     <h3 className='text-center mb-3'>Login</h3>
                     <form action="" onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
                        <CustomInput type="email"
                           name="email"
                           placeholder="Email"
                           value={formik.values.email}
                           onChange={formik.handleChange('email')}
                           onBlur={formik.handleBlur('email')}
                        />
                        <div className="error">
                           {formik.touched.email && formik.errors.email}
                        </div>

                        <CustomInput type="password"
                           name="password"
                           placeholder="Password"
                           value={formik.values.password}
                           onChange={formik.handleChange('password')}
                           onBlur={formik.handleBlur('password')}
                        />
                        <div className="error">
                           {formik.touched.password && formik.errors.password}
                        </div>

                        <div>
                           <Link to='/forgot-password'>Forgot Password?</Link>
                           <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                              <button className='button border-0' type='submit'>Login</button>
                              <Link to='/signup' className='button signup'>SignUp</Link>
                           </div>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </Container>
      </>
   )
}

export default Login