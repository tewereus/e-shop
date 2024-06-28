import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import { AiOutlineHome, AiOutlinePhone, AiOutlineMail, AiOutlineInfoCircle } from "react-icons/ai"
import Container from '../components/Container'
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux'
import { createQuery } from '../features/contact/contactSlice'

const regexPhoneNumber = /(0[3|5|7|8|9])+([0-9]{8})\b/g;

let contactSchema = yup.object({
   name: yup.string().required('Name is required'),
   email: yup.string().email('Email is not valid').required('Email is required'),
   mobile: yup.string().required('Mobile Number is required').matches(regexPhoneNumber, 'Mobile Number is not valid'),
   comment: yup.string().required('Comment is required'),
});

const Contact = () => {
   const dispatch = useDispatch();
   const formik = useFormik({
      initialValues: {
         name: '',
         email: '',
         mobile: '',
         comment: '',
      },
      validationSchema: contactSchema,
      onSubmit: (values) => {
         dispatch(createQuery(values))
         formik.resetForm();
      },
   });

   return (
      <>
         <Meta title={"Contact Us"} />
         <BreadCrumb title="Contact Us" />
         <Container class1="contact-wrapper py-5 home-wrapper-2">
            <div className="row">
               <div className="col-12">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5424.727697534695!2d108.26376918785061!3d15.96860739606684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142116949840599%3A0x365b35580f52e8d5!2zxJDhuqFpIGjhu41jIEZQVCAoRlBUIHVuaXZlcnNpdHkp!5e0!3m2!1sen!2s!4v1695742418258!5m2!1sen!2s" width="600" height="450" className='border-0 w-100' allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
               </div>
               <div className="col-12 mt-5">
                  <div className="contact-inner-wrapper d-flex justify-content-between">
                     <div>
                        <h3 className="contact-title mb-4">Contact</h3>
                        <form action="" onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
                           <div>
                              <input type="text"
                                 className="form-control"
                                 placeholder='Name'
                                 name='name'
                                 onChange={formik.handleChange('name')}
                                 onBlur={formik.handleBlur('name')}
                                 value={formik.values.name}
                              />
                              <div className="error">
                                 {
                                    formik.touched.name && formik.errors.name
                                 }
                              </div>
                           </div>
                           <div>
                              <input type="email"
                                 className="form-control"
                                 placeholder='Email'
                                 name='email'
                                 onChange={formik.handleChange('email')}
                                 onBlur={formik.handleBlur('email')}
                                 value={formik.values.email}
                              />
                              <div className="error">
                                 {
                                    formik.touched.email && formik.errors.email
                                 }
                              </div>
                           </div>
                           <div>
                              <input type="tel"
                                 className="form-control"
                                 placeholder='Mobile Number'
                                 name='mobile'
                                 onChange={formik.handleChange('mobile')}
                                 onBlur={formik.handleBlur('mobile')}
                                 value={formik.values.mobile}
                              />
                              <div className="error">
                                 {
                                    formik.touched.mobile && formik.errors.mobile
                                 }
                              </div>
                           </div>
                           <div>
                              <textarea id=""
                                 className='w-100 form-control' cols="30" rows="4"
                                 placeholder='Comments'
                                 name='comment'
                                 onChange={formik.handleChange('comment')}
                                 onBlur={formik.handleBlur('comment')}
                                 value={formik.values.comment}
                              ></textarea>
                              <div className="error">
                                 {
                                    formik.touched.comment && formik.errors.comment
                                 }
                              </div>
                           </div>
                           <div>
                              <button className="button border-0">Submit</button>
                           </div>
                        </form>
                     </div>
                     <div>
                        <h3 className="contact-title mb-4">Get In Touch With Us</h3>
                        <div>
                           <ul className='ps-0'>
                              <li className='mb-3 d-flex gap-15 align-items-center'>
                                 <AiOutlineHome className='fs-5' />
                                 <address className='mb-0'>Ngu Hanh Son, Da Nang</address>
                              </li>
                              <li className='mb-3 d-flex gap-15 align-items-center'>
                                 <AiOutlinePhone className='fs-5' />
                                 <a href="tel: +84 852656550">+84 852656550</a>
                              </li>
                              <li className='mb-3 d-flex gap-15 align-items-center'>
                                 <AiOutlineMail className='fs-5' />
                                 <a href="mailto: f-digitic@gmail.com">f-digitic@gmail.com</a>
                              </li>
                              <li className='mb-3 d-flex gap-15 align-items-center'>
                                 <AiOutlineInfoCircle className='fs-5' />
                                 <p className='mb-0'>Monday – Friday 8 AM – 8 PM</p>
                              </li>
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </Container>
      </>
   )
}

export default Contact