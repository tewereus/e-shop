import React from 'react'
import ReactStars from "react-rating-stars-component";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import wish from '../images/wish.svg';
import prodcompare from '../images/prodcompare.svg';
import watch from '../images/smartwatch.avif';
import watch2 from '../images/smartwatch2.avif';
import view from '../images/view.svg';
import addcart from '../images/add-cart.svg';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist } from '../features/products/productSlice'
import { getUserProductWishlist } from '../features/user/userSlice';

const ProductCard = (props) => {
   const getTokenFromLocalStorage = localStorage.getItem('customer') ? JSON.parse(localStorage.getItem('customer')) : null

   const config2 = {
      headers: {
         'Authorization': `Bearer ${getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""}`,
         'Accept': 'application/json'
      }
   }

   const { grid, data } = props
   const dispatch = useDispatch()
   const navigate = useNavigate()
   let location = useLocation();

   const addProdToWishlist = (id) => {
      dispatch(addToWishlist({ id: id, config2: config2 }));
      dispatch(getUserProductWishlist(config2));
      navigate('/wishlist')
   }

   return (
      <>
         {
            data && data?.map((item, index) => {
               return (
                  <div
                     key={index}
                     className={`${location.pathname == "/product" ? `gr-${grid}` : "col-3"} `}
                  >
                     <div
                        className="product-card position-relative">
                        <div className="wishlist-icon position-absolute">
                           <button className='border-0 bg-transparent' onClick={(e) => {
                              addProdToWishlist(item?._id)
                           }}>
                              <img src={wish} alt="wishlist" />
                           </button>
                        </div>
                        <div className="product-image">
                           <img src={item?.images[0]?.url} className='img-fluid mx-auto' alt="product image" width={220} />
                        </div>
                        <div className="product-details">
                           <h6 className="brand">{item?.brand}</h6>
                           <h5 className="product-title">{item?.title}</h5>
                           <ReactStars
                              count={5}
                              size={24}
                              value={item?.totalrating.toString()}
                              edit={false}
                              activeColor="#ffd700"
                           />
                           <p className={`description ${grid == 12 ? "d-block" : "d-none"}`}
                              dangerouslySetInnerHTML={{ __html: item?.description }}
                           >
                           </p>
                           <p className="price">$ {item?.price}</p>
                        </div>
                        <div className="action-bar position-absolute">
                           <div className='d-flex flex-column gap-15'>
                              {/* <button className='border-0 bg-transparent'>
                                 <img src={prodcompare} alt="compare" />
                              </button> */}
                              <Link to={'/product/' + item?._id} className='border-0 bg-transparent'>
                                 <img src={view} alt="view" />
                              </Link>
                              {/* <button className='border-0 bg-transparent'>
                                 <img src={addcart} alt="addcart" />
                              </button> */}
                           </div>
                        </div>
                     </div>
                  </div >
               )
            })
         }
      </>
   )
}

export default ProductCard