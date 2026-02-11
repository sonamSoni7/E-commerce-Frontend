import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../features/products/productSlilce";
import { getuserProductWishlist } from "../features/user/userSlice";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import ReactStars from "react-rating-stars-component";
import { useNavigate } from "react-router-dom";
const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getuserProductWishlist());
  }, [dispatch]);
  const isProductInWishlist = (productId) => {
    return wishlist?.some((item) => item._id === productId);
  };
  const wishlistState = useSelector((state) => state?.auth?.wishlist?.wishlist);
  const [wishlist, setWishlist] = useState(wishlistState || []);
  const addToWish = (productId) => {
    dispatch(addToWishlist(productId));
    // Since we don't have the product object here to add it back safely if it was removed,
    // and removing it locally is fine for "Toggle Off", 
    // the safest way to ensure consistency for "Toggle On" is to Fetch again 
    // or just let the backed handle it. 
    // For smoother experience on "Remove":
    if (isProductInWishlist(productId)) {
       const updatedWishlist = wishlist.filter((item) => item._id !== productId);
       setWishlist(updatedWishlist);
    } else {
       // If adding back, we must fetch because we don't have the object details
       setTimeout(() => {
        dispatch(getuserProductWishlist());
       }, 300); 
    }
  };
  
  // Sync local state when redux state changes (e.g. after fetch)
  useEffect(() => {
    setWishlist(wishlistState || []);
  }, [wishlistState]);
    
  return (
    <>
      <Meta title={"Wishlist"} />
      <BreadCrumb title="Wishlist" />
      <Container class1="wishlist-wrapper home-wrapper-2 py-5">
        <div className="row">
          {wishlistState && wishlistState.length === 0 && (
            <div className="text-center fs-3">No Data</div>
          )}
          {wishlistState &&
            wishlistState?.map((item, index) => {
              const isWishlist = isProductInWishlist(item._id);
              return (
                        <div
                          key={index}
                          className={"col-12 col-sm-6 col-md-4 col-lg-3 mb-3"}
                        >
                          <div className="product-card position-relative">
                            <div className="product-image">
                              <img
                                src={item?.images?.[0]?.url?.startsWith("/") ? `${process.env.REACT_APP_API_BASE_URL}${item?.images?.[0]?.url}` : (item?.images?.[0]?.url)}
                                alt="product"
                                width="100%"
                                height="270px"
                                style={{ objectFit: "cover", display: "block" }}
                                onClick={() => navigate("/product/" + item?._id)}
                              />
                            </div>
                            <div className="product-details">
                              <div className="d-flex justify-content-between align-items-start mb-2">
                                <h5 className="product-title mb-0 flex-grow-1">
                                  {item?.title}
                                </h5>
                                <button
                                  className="border-0 bg-transparent p-0 ms-2"
                                  onClick={(e) => addToWish(item?._id)}
                                >
                                  {isWishlist ? (
                                    <AiFillHeart className="fs-5" style={{ color: "#febd69" }} />
                                  ) : (
                                    <AiOutlineHeart className="fs-5" />
                                  )}
                                </button>
                              </div>
                              <ReactStars
                                count={5}
                                size={24}
                                value={item?.totalrating}
                                edit={false}
                                activeColor="#ffd700"
                              />
              
                              <p className="price">Rs.{item?.price}</p>
                            </div>
                          </div>
                        </div>
                      );
            })}
        </div>
      </Container>
    </>
  );
};

export default Wishlist;
