import React, { useEffect } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import Container from '../components/Container'
import { useDispatch, useSelector } from 'react-redux';
import { getUserProductWishlist } from '../features/user/userSlice';
import { addToWishlist } from '../features/products/productSlice';

const Wishlist = () => {
   const getTokenFromLocalStorage = localStorage.getItem('customer') ? JSON.parse(localStorage.getItem('customer')) : null

   const config2 = {
      headers: {
         'Authorization': `Bearer ${getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""}`,
         'Accept': 'application/json'
      }
   }

   const dispatch = useDispatch();
   const wishlistState = useSelector((state) => state.auth?.wishlist?.wishlist)

   useEffect(() => {
      dispatch(getUserProductWishlist(config2))
   }, [])

   const removeFromWishlist = (id) => {
      dispatch(addToWishlist({ id: id, config2: config2 }))
      setTimeout(() => {
         dispatch(getUserProductWishlist(config2))
      }, 500)
   }

   return (
      <>
         <Meta title={"Wishlist"} />
         <BreadCrumb title="Wishlist" />
         <Container class1="wishlist-wrapper home-wrapper-2 py-5">
            <div className="row">
               {
                  wishlistState && wishlistState?.length === 0 && (
                     <div className='text-center fs-3'>No Data</div>
                  )
               }
               {
                  wishlistState && wishlistState?.map((item, index) => {
                     return (
                        <div className="col-3" key={index}>
                           <div className="wishlist-card position-relative">
                              <img onClick={() => { removeFromWishlist(item?._id) }} src="images/cross.svg" alt="cross" className="position-absolute cross img-fluid" />
                              <div className="wishlist-card-image bg-white">
                                 <img src={item?.images[0].url ? item?.images[0].url : "images/smartwatch.avif"} className='img-fluid d-block mx-auto' alt="smartwatch" width={160} />
                              </div>
                              <div className="py-3 px-3">
                                 <h5 className="title">{item?.title}</h5>
                                 <h6 className="price">$ {item?.price}</h6>
                              </div>
                           </div>
                        </div>
                     )
                  })
               }
            </div>
         </Container>
      </>
   )
}

export default Wishlist