import React, { useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";
import BlogCard from "../components/BlogCard";
import SpecialProduct from "../components/SpecialProduct";
import Container from "../components/Container";
import { services } from "../utils/Data";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlog } from "../features/blogs/blogSlice";
import moment from "moment";
import {
  getAllProduct,
  addToWishlist,
} from "../features/products/productSlice";
import wish from "../images/wish.svg";
import view from "../images/view.svg";

const Home = () => {
  const blogState = useSelector((state) => state?.blog?.blog);
  const productState = useSelector((state) => state?.product?.product);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBlog());
    dispatch(getAllProduct());
  }, []);

  const addProdToWishlist = (id) => {
    dispatch(addToWishlist(id));
  };

  return (
    <>
      <Container class1="py-5">
        <div className="row">
          <div className="col-12">
            <div className="main-banner position-relative">
              <img
                src="images/banner-1.jpg"
                className="img-fluid rounded-3"
                alt="main-banner"
                style={{
                  height: "500px",
                  objectFit: "cover",
                  width: "100%",
                }}
              />
              <div className="main-banner-content position-absolute">
                <h4>BEST SELLING ITEM</h4>
                <h5>iPad 12 Generation</h5>
                <p style={{ marginTop: "5rem" }}>$999.00</p>
                <Link className="button" style={{ marginTop: "4rem" }}>
                  BUY NOW
                </Link>
              </div>
            </div>
          </div>
          {/* <div className="col-6">
               <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
                  <div className="small-banner position-relative">
                     <img src="images/catbanner-01.jpg" className='img-fluid rounded-3' alt="main-banner" />
                     <div className="small-banner-content position-absolute">
                        <h4>BEST SALE</h4>
                        <h5>Laptops</h5>
                        <p>From $1699.00 <br /> or $64.62/mo.</p>
                     </div>
                  </div>
                  <div className="small-banner position-relative">
                     <img src="images/catbanner-02.jpg" className='img-fluid rounded-3' alt="main-banner" />
                     <div className="small-banner-content position-absolute">
                        <h4>15% OFF</h4>
                        <h5>Smartwatchs</h5>
                        <p>Shop the latest band <br /> styles and colors.</p>
                     </div>
                  </div>
                  <div className="small-banner position-relative">
                     <img src="images/catbanner-03.jpg" className='img-fluid rounded-3' alt="main-banner" />
                     <div className="small-banner-content position-absolute">
                        <h4>NEW ARRIVAL</h4>
                        <h5>Buy IPad Air</h5>
                        <p>From $599 or $49.92/mo.</p>
                     </div>
                  </div>
                  <div className="small-banner position-relative">
                     <img src="images/catbanner-04.jpg" className='img-fluid rounded-3' alt="main-banner" />
                     <div className="small-banner-content position-absolute">
                        <h4>FREE ENGRAVING</h4>
                        <h5>AirPods Max</h5>
                        <p>High-fidelity playback & <br /> ultra-low distortion</p>
                     </div>
                  </div>
               </div>
            </div> */}
        </div>
      </Container>

      <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="services d-flex align-items-center justify-content-between">
              {services?.map((i, j) => {
                return (
                  <div className="d-flex align-items-center gap-15" key={j}>
                    <img src={i.image} alt="services" />
                    <div>
                      <h6>{i.title}</h6>
                      <p className="mb-0">{i.tagline}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>

      <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="categories d-flex justify-content-between flex-wrap align-items-center">
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Computers & Laptop</h6>
                  <p>8 Items</p>
                </div>
                <img src="images/laptop.avif" alt="laptop" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Cameras & Videos</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/speaker.webp" alt="speaker" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Smart Television</h6>
                  <p>12 Items</p>
                </div>
                <img src="images/tv.jpg" alt="tv" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Smart Watches</h6>
                  <p>13 Items</p>
                </div>
                <img src="images/smart-watch.jpg" alt="watch" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Mobiles & tablets</h6>
                  <p>20 Items</p>
                </div>
                <img src="images/mobile.webp" alt="mobile" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Music & Gaming</h6>
                  <p>6 Items</p>
                </div>
                <img src="images/gaming.webp" alt="gaming" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Headphones</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/headphone.jpg" alt="watch" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Cameras</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="featured-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Featured Collection</h3>
          </div>
          {productState &&
            productState?.map((item, index) => {
              if (item?.tags === "featured") {
                return (
                  <div key={index} className={"col-3"}>
                    <div className="product-card position-relative">
                      <div className="wishlist-icon position-absolute">
                        <button
                          className="border-0 bg-transparent"
                          onClick={(e) => {
                            addProdToWishlist(item?._id);
                          }}
                        >
                          <img src={wish} alt="wishlist" />
                        </button>
                      </div>
                      <div className="product-image">
                        <img
                          src={item?.images[0]?.url}
                          className="img-fluid mx-auto"
                          alt="product image"
                          width={220}
                        />
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
                        <p className="price">$ {item?.price}</p>
                      </div>
                      <div className="action-bar position-absolute">
                        <div className="d-flex flex-column gap-15">
                          {/* <button className='border-0 bg-transparent'>
                                       <img src={prodcompare} alt="compare" />
                                    </button> */}
                          <button className="border-0 bg-transparent">
                            <img
                              onClick={() => navigate("/product/" + item?._id)}
                              src={view}
                              alt="view"
                            />
                          </button>
                          {/* <button className='border-0 bg-transparent'>
                                       <img src={addcart} alt="addcart" />
                                    </button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
        </div>
      </Container>

      <Container class1="famous-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous.webp"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5>Big Screen</h5>
                <h6>Apple Watch Series 9</h6>
                <p>From $399or $16.62/mo. for 24 mo.*</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous-02.webp"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">Studio Display</h5>
                <h6 className="text-dark">600 nits of brightness.</h6>
                <p className="text-dark">27-inch 5K Retina display</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous-03.webp"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">smartphones</h5>
                <h6 className="text-dark">Iphone 15 Pro.</h6>
                <p className="text-dark">
                  Now in Green. From $999.00 or $41.62/mo. for 24 mo. Footnote*
                </p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous-04.webp"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">home speakers</h5>
                <h6 className="text-dark">Room-filling sound.</h6>
                <p className="text-dark">
                  From $699 or $116.58/mo. for 12 mo.*
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="special-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Special Products</h3>
          </div>
        </div>
        <div className="row">
          {productState &&
            productState?.map((item, index) => {
              if (item?.tags === "special") {
                return (
                  <SpecialProduct
                    key={index}
                    id={item?._id}
                    title={item?.title}
                    brand={item?.brand}
                    totalrating={item?.totalrating.toString()}
                    price={item?.price}
                    sold={item?.sold}
                    quantity={item?.quantity}
                    image={item?.images[0].url}
                  />
                );
              }
            })}
        </div>
      </Container>

      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
        </div>
        <div className="row">
          {productState &&
            productState?.map((item, index) => {
              if (item?.tags === "popular") {
                return (
                  <div key={index} className={"col-3"}>
                    <div className="product-card position-relative">
                      <div className="wishlist-icon position-absolute">
                        <button
                          className="border-0 bg-transparent"
                          onClick={(e) => {
                            addProdToWishlist(item?._id);
                          }}
                        >
                          <img src={wish} alt="wishlist" />
                        </button>
                      </div>
                      <div className="product-image">
                        <img
                          src={item?.images[0]?.url}
                          className="img-fluid mx-auto"
                          alt="product image"
                          width={220}
                        />
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
                        <p className="price">$ {item?.price}</p>
                      </div>
                      <div className="action-bar position-absolute">
                        <div className="d-flex flex-column gap-15">
                          {/* <button className='border-0 bg-transparent'>
                                       <img src={prodcompare} alt="compare" />
                                    </button> */}
                          <button className="border-0 bg-transparent">
                            <img
                              onClick={() => navigate("/product/" + item?._id)}
                              src={view}
                              alt="view"
                            />
                          </button>
                          {/* <button className='border-0 bg-transparent'>
                                       <img src={addcart} alt="addcart" />
                                    </button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
        </div>
      </Container>

      <Container class1="marque-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="marquee-inner-wrapper card-wrapper">
              <Marquee className="d-flex">
                <div className="mx-4 w-25">
                  <img src="images/brand-01.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-02.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-03.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-04.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-05.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-06.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-07.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-08.png" alt="brand" />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="blog-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Lastest Blogs</h3>
          </div>
          <div className="row">
            {blogState &&
              blogState?.map((item, index) => {
                if (index < 3) {
                  return (
                    <div className="col-3" key={index}>
                      <BlogCard
                        id={item?._id}
                        title={item?.title}
                        description={item?.description}
                        image={item?.images[0]?.url}
                        date={moment(item?.created_at).format(
                          "MMMM Do YYYY, h:mm a"
                        )}
                      />
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
