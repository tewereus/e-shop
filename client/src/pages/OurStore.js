import React, { useEffect, useState } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import ReactStars from "react-rating-stars-component";
import ProductCard from "../components/ProductCard"
import Color from '../components/Color';
import { RiFilterOffLine } from 'react-icons/ri'
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../features/products/productSlice';

const OurStore = () => {
   const [grid, setGrid] = useState(4);
   const productState = useSelector((state) => state?.product?.product)
   const [brands, setBrands] = useState([])
   const [categories, setCategories] = useState([])
   const [tags, setTags] = useState([])

   // Filter States
   const [brand, setBrand] = useState(null)
   const [tag, setTag] = useState(null)
   const [category, setCategory] = useState(null)
   const [minPrice, setMinPrice] = useState(null)
   const [maxPrice, setMaxPrice] = useState(null)
   const [sort, setSort] = useState('title')

   useEffect(() => {
      let newBrands = []
      let categories = []
      let newTags = []
      for (let index = 0; index < productState.length; index++) {
         const element = productState[index];
         newBrands.push(element.brand)
         categories.push(element.category)
         newTags.push(element.tags)
      }
      setBrands(newBrands)
      setCategories(categories)
      setTags(newTags)
   }, [productState])

   const dispatch = useDispatch()
   useEffect(() => {
      dispatch(getAllProduct({ sort, tag, brand, category, minPrice, maxPrice }))
   }, [sort, tag, brand, category, minPrice, maxPrice])

   const clearFilter = () => {
      setBrand(null)
      setTag(null)
      setCategory(null)
      setMinPrice(null)
      setMaxPrice(null)
   }

   return (
      <>
         <Meta title={"Our Store"} />
         <BreadCrumb title="Our Store" />
         <Container class1="store-wrapper home-wrapper-2 py-5">
            <div className="row">
               <div className="col-3">
                  <div className='filter-card mb-3'>
                     <div className='d-flex justify-content-between'>
                        <h3 className="filter-title">
                           Shop By Categories
                        </h3>
                        <RiFilterOffLine className='fs-4' onClick={() => clearFilter()} />
                     </div>
                     <div>
                        <ul className='ps-0'>
                           {
                              categories && [...new Set(categories)].map((item, index) => {
                                 return <li key={index} onClick={() => setCategory(item)}>{item}</li>
                              })
                           }
                        </ul>
                     </div>
                  </div>
                  <div className='filter-card mb-3'>
                     <h3 className="filter-title">
                        Filter By
                     </h3>
                     <div>
                        <h5 className="sub-title">Price</h5>
                        <div className='d-flex align-items-center gap-10'>
                           <div className="form-floating">
                              <input
                                 type="number"
                                 className="form-control"
                                 id="floatingInput"
                                 placeholder="From"
                                 onChange={(e) => setMinPrice(e.target.value)}
                              />
                              <label htmlFor="floatingInput">From</label>
                           </div>
                           <div className="form-floating">
                              <input
                                 type="number"
                                 className="form-control"
                                 id="floatingInput1"
                                 placeholder="To"
                                 onChange={(e) => setMaxPrice(e.target.value)}
                              />
                              <label htmlFor="floatingInput1">To</label>
                           </div>
                        </div>
                     </div>
                     <div className='mt-4 mb-3'>
                        <h5 className="sub-title">Product Tag</h5>
                        <div>
                           <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                              {
                                 tags && [...new Set(tags)].map((item, index) => {
                                    return (
                                       <span key={index} onClick={() => setTag(item)} className="text-capitalize badge bg-light text-secondary rounded-3 py-2 px-3" style={{ cursor: "pointer" }}>
                                          {item}
                                       </span>
                                    )
                                 })
                              }
                           </div>
                        </div>
                     </div>
                     <div className='mt-4 mb-3'>
                        <h5 className="sub-title">Product Brand</h5>
                        <div>
                           <div className="product-brands d-flex flex-wrap align-items-center gap-10">
                              {
                                 brands && [...new Set(brands)].map((item, index) => {
                                    return (
                                       <span key={index} onClick={() => setBrand(item)} className="text-capitalize badge bg-light text-secondary rounded-3 py-2 px-3" style={{ cursor: "pointer" }}>
                                          {item}
                                       </span>
                                    )
                                 })
                              }
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="col-9">
                  <div className="filter-sort-grid mb-4">
                     <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-10">
                           <p className="mb-0 d-block" style={{ "width": "100px" }}>Sort By:</p>
                           <select
                              name=""
                              defaultValue={"title"}
                              className='form-control form-select'
                              id=""
                              onChange={(e) => setSort(e.target.value)}
                           >
                              <option value="title">Alphabetically, A-Z</option>
                              <option value="-title">Alphabetically, Z-A</option>
                              <option value="price">Price, low to high</option>
                              <option value="-price">Price, high to low</option>
                              <option value="createdAt">Date, old to new</option>
                              <option value="-createdAt">Date, new to old</option>
                           </select>
                        </div>
                        <div className='d-flex align-items-center gap-10'>
                           <p className="totalproduct mb-0">{productState?.length} products</p>
                           <div className="d-flex gap-10 align-items-center grid">
                              <img onClick={() => {
                                 setGrid(3);
                              }} src="images/gr4.svg" className='d-block img-fluid' alt="grid" />
                              <img onClick={() => {
                                 setGrid(4);
                              }} src="images/gr3.svg" className='d-block img-fluid' alt="grid" />
                              <img onClick={() => {
                                 setGrid(6);
                              }} src="images/gr2.svg" className='d-block img-fluid' alt="grid" />
                              <img onClick={() => {
                                 setGrid(12);
                              }} src="images/gr.svg" className='d-block img-fluid' alt="grid" />
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="products-list pb-5">
                     <div className="d-flex gap-10 flex-wrap">
                        <ProductCard data={productState ? productState : []} grid={grid} />
                     </div>
                  </div>
               </div>
            </div>
         </Container>
      </>
   )
}

export default OurStore