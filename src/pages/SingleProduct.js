import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";

import Color from "../components/Color";
import { AiOutlineHeart, AiFillHeart, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import {
  addRating,
  getAProduct,
  getAllProducts,
} from "../features/products/productSlilce";
import { toast } from "react-toastify";
import { addProdToCart, getUserCart } from "../features/user/userSlice";

const SingleProduct = () => {
  const [color, setColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const getProductId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const productState = useSelector((state) => state?.product?.singleproduct);
  const productsState = useSelector((state) => state?.product?.product);
  const cartState = useSelector((state) => state?.auth?.cartProducts);

  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    if (productState?.images?.length > 0) {
      setActiveImage(productState?.images[0]?.url);
    }
  }, [productState]);

  useEffect(() => {
    dispatch(getAProduct(getProductId));
    dispatch(getUserCart());
    dispatch(getAllProducts());
    window.scrollTo(0, 0); // Scroll to top when component mounts
  }, [getProductId, dispatch]);

  useEffect(() => {
    if (!cartState) return;
    let found = false;
    for (let index = 0; index < cartState.length; index++) {
      if (getProductId === cartState[index]?.productId?._id) {
        found = true;
        break;
      }
    }
    setAlreadyAdded(!!found);
  }, [cartState, getProductId]);

  const uploadCart = async () => {
    if (color === null) {
      toast.error("Please choose Color");
    } else {
      await dispatch(
        addProdToCart({
          productId: productState?._id,
          quantity,
          color,
          price: productState?.price,
        })
      );
      // Navigate only after the cart has been updated
      navigate("/cart");
    }
  };

  // Helper to get full URL
  const getImageUrl = (url) => {
    if (!url) return "/images/adisha/logo.png";
    return url.startsWith("/") ? `${process.env.REACT_APP_API_BASE_URL}${url}` : url;
  };

  const [orderedProduct] = useState(true);
  const copyToClipboard = (text) => {
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  const [popularProduct, setPopularProduct] = useState([]);

  useEffect(() => {
    if (!productsState) return;
    const data = [];
    for (let index = 0; index < productsState.length; index++) {
      const element = productsState[index];
      if (element.tags === "popular") {
        data.push(element);
      }
    }
    setPopularProduct(data);
  }, [productsState]);

  const [star, setStar] = useState(null);
  const [comment, setComment] = useState(null);
  const [isFilled, setIsFilled] = useState(false);

  const handleToggle = () => {
    setIsFilled(!isFilled);
  };

  const addRatingToProduct = () => {
    if (star === null) {
      toast.error("Please add star rating");
      return false;
    } else if (comment === null) {
      toast.error("Please Write Review About the Product");
      return false;
    } else {
      dispatch(
        addRating({ star: star, comment: comment, prodId: getProductId })
      );
      setTimeout(() => {
        dispatch(getAProduct(getProductId));
      }, 100);
    }
    return false;
  };

  const handleNext = () => {
    if (!productState?.images?.length) return;
    const currentIndex = productState?.images?.findIndex(img => img.url === activeImage);
    const nextIndex = (currentIndex + 1) % productState.images.length;
    setActiveImage(productState.images[nextIndex].url);
  };

  const handlePrev = () => {
    if (!productState?.images?.length) return;
    const currentIndex = productState?.images?.findIndex(img => img.url === activeImage);
    const prevIndex = (currentIndex - 1 + productState.images.length) % productState.images.length;
    setActiveImage(productState.images[prevIndex].url);
  };

  return (
    <>
      <Meta title={"Product Name"} />
      <BreadCrumb title={productState?.title} />
      <Container class1="main-product-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12 col-lg-6 mb-4 mb-lg-0">
            <div className="main-product-image position-relative">
              <div style={{ height: "500px", width: "100%", backgroundColor: "white" }}>
                <img
                  src={getImageUrl(activeImage || productState?.images?.[0]?.url)}
                  alt="product"
                  className="img-fluid"
                />
              </div>
              {productState?.images?.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="position-absolute border-0 bg-white rounded-circle d-flex align-items-center justify-content-center"
                    style={{ top: '50%', left: '10px', transform: 'translateY(-50%)', width: '30px', height: '30px', cursor: 'pointer', zIndex: 1, boxShadow: '0 0 5px rgba(0,0,0,0.2)' }}
                  >
                    <AiOutlineLeft />
                  </button>
                  <button
                    onClick={handleNext}
                    className="position-absolute border-0 bg-white rounded-circle d-flex align-items-center justify-content-center"
                    style={{ top: '50%', right: '10px', transform: 'translateY(-50%)', width: '30px', height: '30px', cursor: 'pointer', zIndex: 1, boxShadow: '0 0 5px rgba(0,0,0,0.2)' }}
                  >
                    <AiOutlineRight />
                  </button>
                </>
              )}
            </div>
            <div className="other-product-images d-flex gap-15 overflow-auto mt-3 p-1" style={{ flexWrap: 'nowrap', scrollBehavior: 'smooth' }}>
              {productState?.images.map((item, index) => {
                return (
                  <div key={index}
                    className="cursor-pointer flex-shrink-0"
                    onClick={() => setActiveImage(item?.url)}
                    style={{ border: activeImage === item?.url ? "2px solid #febd69" : "1px solid #eba446", padding: "5px", width: '25%' }}>
                    <img
                      src={getImageUrl(item?.url)}
                      className="img-fluid"
                      alt=""
                      style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="main-product-details">
              <div className="border-bottom">
                <h3 className="title">{productState?.title}</h3>
              </div>
              <div className="border-bottom py-3">
                <p className="price"> Rs. {productState?.price}/-</p>
                <div className="d-flex align-items-center gap-10">
                  <ReactStars
                    count={5}
                    size={24}
                    value={productState?.totalrating.toString()}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p className="mb-0 t-review">
                    ( {productState?.ratings?.length} Reviews )
                  </p>
                </div>
                <a className="review-btn" href="#review">
                  Write a Review
                </a>
              </div>
              <div className=" py-3">
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Type :</h3>
                  <p className="product-data">{productState?.category}</p>
                </div>

                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Category :</h3>
                  <p className="product-data">{productState?.category}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Tags :</h3>
                  <p className="product-data">{productState?.tags}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Availability :</h3>
                  {productState?.quantity > 0 ?
                    <p className="product-data">In Stock</p>
                    : <p className="product-data">Out of Stock</p>
                  }
                </div>
                <div className="d-flex gap-10 align-items-center my-2 mb-3">
                  {productState?.quantity < 1000 && (
                    <p
                      style={{
                        backgroundColor: "#fff2f2",
                        color: "#db4444",
                        padding: "10px 15px",
                        borderRadius: "5px",
                        border: "1px solid #f5c6c6",
                        fontSize: "14px",
                        fontWeight: "500",
                        width: "100%"
                      }}
                    >
                      Hurry Up! Only {productState?.quantity} Item(s) left in stock!
                    </p>
                  )}
                </div>
                {alreadyAdded === false && (
                  <div className="d-flex gap-10 flex-column mt-2 mb-3 ">
                    <h3 className="product-heading">Color :</h3>
                    <Color
                      setColor={setColor}
                      colorData={productState?.color}
                    />
                  </div>
                )}
                {alreadyAdded === false && (
                  <div className="d-flex flex-column align-items-start gap-10 flex-row mt-2 mb-3">
                    <h3 className="product-heading mb-3">Quantity :</h3>
                    <input
                      type="number"
                      name=""
                      min={1}
                      max={Math.min(10, productState?.quantity)}
                      className="form-control"
                      style={{ width: "70px" }}
                      id=""
                      onChange={(e) => {
                        const val = e.target.value;
                        // Allow empty string for typing
                        if (val === "") {
                          setQuantity("");
                          return;
                        }
                        const intVal = parseInt(val);
                        if (!isNaN(intVal)) {
                          const maxVal = Math.min(10, productState?.quantity);
                          if (intVal > maxVal) {
                            setQuantity(maxVal);
                          } else {
                            setQuantity(intVal);
                          }
                        }
                      }}
                      onBlur={() => {
                        // Enforce Min and Fallback
                        if (quantity === "" || quantity < 1) {
                          setQuantity(1);
                        }
                      }}
                      value={quantity}
                    />
                  </div>
                )}
                <div className="d-flex align-items-start gap-10 mt-2 mb-3">
                  <button
                    className="button border-0"
                    type="button"
                    onClick={() => {
                      alreadyAdded ? navigate("/cart") : uploadCart();
                    }}
                  >
                    {alreadyAdded ? "Go to Cart" : "Add to Cart "}
                  </button>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <div>
                    {isFilled ? (
                      <AiFillHeart
                        className="fs-5 me-2"
                        onClick={handleToggle}
                      />
                    ) : (
                      <AiOutlineHeart
                        className="fs-5 me-2"
                        onClick={handleToggle}
                      />
                    )}
                  </div>
                </div>
                <div className="d-flex gap-10 flex-column  my-3">
                  <h3 className="product-heading">Shipping & Returns :</h3>
                  <p className="product-data">
                    Free shipping and returns available on all orders! <br /> We
                    ship all India domestic orders within
                    <b> 5-10 business days!</b>
                  </p>
                </div>
                <div className="d-flex gap-10 align-items-center my-3">
                  <h3 className="product-heading">Product Link:</h3>
                  <button type="button" className="btn btn-link p-0" onClick={() => copyToClipboard(window.location.href)}>
                    Copy Product Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="description-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h4>Description</h4>
            <div className="bg-white p-3">
              <p
                dangerouslySetInnerHTML={{
                  __html: productState?.description,
                }}
              ></p>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="reviews-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 id="review">Reviews</h3>
            <div className="review-inner-wrapper">
              {/* <div className="review-head d-flex justify-content-between align-items-end"> */}
              <div>
                <h4 className="mb-2">Customer Reviews</h4>
                <ReactStars
                  count={5}
                  size={24}
                  value={productState?.totalrating?.toString()}
                  edit={false}
                  activeColor="#ffd700"
                />
                <p className="mb-4">
                  Based on {productState?.ratings?.length} Reviews
                </p>
              </div>
              {orderedProduct && (
                <a className="text-dark text-decoration-underline" href="#review">
                  <h4>Write a Review</h4>
                </a>
              )}
              {/* </div> */}
              <div className="review-form py-2">
                <div>
                  <ReactStars
                    count={5}
                    size={24}
                    value={0}
                    edit={true}
                    activeColor="#ffd700"
                    onChange={(e) => {
                      setStar(e);
                    }}
                  />
                </div>
                <div>
                  <textarea
                    name=""
                    id=""
                    className="w-100 form-control"
                    cols="30"
                    rows="4"
                    placeholder="Comments"
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                  ></textarea>
                </div>
                <div className="d-flex justify-content-end mt-3">
                  <button
                    onClick={addRatingToProduct}
                    className="button border-0"
                    type="button"
                  >
                    Submit Review
                  </button>
                </div>
              </div>
              <div className="reviews mt-4">
                {productState &&
                  productState.ratings?.map((item, index) => {
                    return (
                      <div className="review">
                        <div className="d-flex gap-10 align-items-center">
                          <h6 className="mb-0">user</h6>
                          <ReactStars
                            count={5}
                            size={24}
                            value={item?.star}
                            edit={false}
                            activeColor="#ffd700"
                          />
                        </div>
                        <p className="mt-3">{item?.comment}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
        </div>
        <div className="row">
          <ProductCard data={popularProduct} />
        </div>
      </Container>
    </>
  );
};

export default SingleProduct;
