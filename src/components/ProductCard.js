import React, { useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../features/products/productSlilce";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useState } from "react";

const ProductCard = (props) => {
  const navigate = useNavigate();
  const { grid, data } = props;
  const dispatch = useDispatch();
  const location = useLocation();

  const wishlistState = useSelector((state) => state?.auth?.wishlist?.wishlist);

  const [wishlist, setWishlist] = useState(wishlistState || []);

  useEffect(() => {
    setWishlist(wishlistState || []);
  }, [wishlistState]);

  const isProductInWishlist = (productId) => {
    return wishlist?.some((item) => item._id === productId);
  };

  const addToWish = (productId) => {
    if (isProductInWishlist(productId)) {
      dispatch(addToWishlist(productId)); // Dispatch the action to update the wishlist in Redux store

      const updatedWishlist = wishlist.filter((item) => item._id !== productId);
      setWishlist(updatedWishlist);
    } else {
      dispatch(addToWishlist(productId)); // Dispatch the action to update the wishlist in Redux store

      const product = data.find((item) => item._id === productId);
      setWishlist([...wishlist, product]);
    }
  };

  return (
    <>
      {data && Array.isArray(data) && data.map((item, index) => {
        const isWishlist = isProductInWishlist(item._id);
        return (
          <div
            key={index}
            className={` ${location.pathname === "/product" ? `gr-${grid}` : "col-12 col-sm-6 col-md-4 col-lg-3 mb-3"
              } `}
          >
            <div className="product-card position-relative">
              <div className="product-image">
                <img
                  src={item?.images?.[0]?.url?.startsWith("/") ? `${process.env.REACT_APP_API_BASE_URL}${item?.images?.[0]?.url}` : (item?.images?.[0]?.url)}
                  alt="product image"
                  width="100%"
                  height="270px"
                  style={{ objectFit: "cover", display: "block" }}
                  onClick={() => navigate("/product/" + item?._id)}
                />
              </div>
              <div className="product-details">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5 className="product-title mb-0 flex-grow-1">
                    {grid === 12 || grid === 6
                      ? item?.title
                      : item?.title?.substr(0, 20) + "..."}
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
    </>
  );
};

export default ProductCard;
