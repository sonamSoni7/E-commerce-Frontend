import React, { useEffect, useState, useMemo } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartProduct,
  getUserCart,
  updateCartProduct,
  applyCoupon,
} from "../features/user/userSlice";

const Cart = () => {
  const getTokenFromLocalStorage = localStorage.getItem("customer")
    ? JSON.parse(localStorage.getItem("customer"))
    : null;

  const config2 = useMemo(() => ({
    headers: {
      Authorization: `Bearer ${getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
        }`,
      Accept: "application/json",
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [getTokenFromLocalStorage?.token]);

  const dispatch = useDispatch();

  const [productupdateDetail, setProductupdateDetail] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const userCartState = useSelector((state) => state.auth.cartProducts);

  useEffect(() => {
    dispatch(getUserCart(config2));
    window.scrollTo(0, 0);
  }, [dispatch, config2]);



  const deleteACartProduct = (id) => {
    dispatch(deleteCartProduct({ id: id, config2: config2 }));
    setTimeout(() => {
      dispatch(getUserCart(config2));
    }, 200);
  };

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < userCartState?.length; index++) {
      sum =
        sum +
        Number(userCartState[index].quantity) * userCartState[index].price;
      setTotalAmount(sum);
    }
  }, [userCartState]);

  const [coupon, setCoupon] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const cartProduct = useSelector((state) => state.auth.cartProduct);

  const applyCouponCode = () => {
    dispatch(applyCoupon({ coupon }));
  };

  const cartProductState = useSelector((state) => state.auth.cartProduct);

  useEffect(() => {
    if (cartProductState && typeof cartProductState !== 'object') {
      setTotalAfterDiscount(cartProductState);
    } else {
      setTotalAfterDiscount(0);
    }
  }, [cartProductState]);

  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    if (userCartState) {
      const q = {};
      userCartState.forEach(item => {
        q[item._id] = item.quantity;
      });
      setQuantities(q);
    }
  }, [userCartState]);

  // Remove the old useEffect that watched productupdateDetail. 
  // We will dispatch directly from onBlur.

  const updateCartItem = (id, quantity) => {
    dispatch(
      updateCartProduct({
        cartItemId: id,
        quantity: quantity,
      })
    );
    setTimeout(() => {
      dispatch(getUserCart(config2));
    }, 200);
  };

  return (
    <>
      <Meta title={"Cart"} />
      <BreadCrumb title="Cart" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="cart-header py-3 d-flex justify-content-between align-items-center">
              <h4 className="cart-col-1">Product</h4>
              <h4 className="cart-col-2">Price</h4>
              <h4 className="cart-col-3">Quantity</h4>
              <h4 className="cart-col-4">Total</h4>
            </div>
            {userCartState &&
              userCartState?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center"
                  >
                    <div className="cart-col-1 gap-15 d-flex align-items-center">
                      <div className="w-20">
                        <img
                          src={item?.productId?.images[0]?.url?.startsWith("/") ? `${process.env.REACT_APP_API_BASE_URL}${item?.productId?.images[0]?.url}` : item?.productId?.images[0]?.url}
                          className="img-fluid"
                          style={{ maxWidth: "100px", maxHeight: "100px" }}
                          alt="product"
                        />
                      </div>
                      <div className="w-60">
                        <p>{item?.productId?.title}</p>

                        <p className="d-flex gap-3">
                          Color:
                          <ul className="colors ps-0">
                            <li
                              style={{ backgroundColor: item?.color?.title }}
                            ></li>
                          </ul>
                        </p>
                      </div>
                    </div>
                    <div className="cart-col-2">
                      <h5 className="price">Rs. {Number(item?.price).toFixed(2)}</h5>
                    </div>
                    <div className="cart-col-3 d-flex align-items-center">
                      <div className="d-flex gap-10">
                        <input
                          className="form-control"
                          type="number"
                          name={"quantity" + item?._id}
                          min={1}
                          max={10}
                          id={"card" + item?._id}
                          value={quantities[item?._id] !== undefined ? quantities[item?._id] : item?.quantity}
                          onChange={(e) => {
                            const val = e.target.value;
                            // Just update local state to allow typing
                            setQuantities({ ...quantities, [item?._id]: val });
                          }}
                          onBlur={(e) => {
                            let val = parseInt(e.target.value);
                            const maxVal = Math.min(10, item?.productId?.quantity || 10);

                            if (isNaN(val) || val < 1) val = 1;
                            if (val > maxVal) val = maxVal;

                            // Optimistic update
                            setQuantities({ ...quantities, [item?._id]: val });

                            // Server update
                            updateCartItem(item?._id, val);
                          }}
                        />
                      </div>
                      <div>
                        <AiFillDelete
                          onClick={() => {
                            deleteACartProduct(item?._id);
                          }}
                          className="text-danger "
                        />
                      </div>
                    </div>
                    <div className="cart-col-4">
                      <h5 className="price">
                        Rs. {(item?.quantity * item?.price).toFixed(2)}
                      </h5>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="col-12 py-2 mt-4">
            <div className="d-flex flex-wrap flex-column align-items-center justify-content-between align-items-baseline">
              <Link to="/product" className="button mb-5">
                Continue To Shopping
              </Link>
              {(totalAmount !== null || totalAmount !== 0) && (
                <div className="d-flex flex-column align-items-start">
                  <h4>
                    SubTotal: Rs.{" "}
                    {!userCartState?.length ? "0.00" : totalAmount ? Number(totalAmount).toFixed(2) : "0.00"}
                  </h4>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Coupon Code"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                    />
                    <button className="button mt-3" onClick={applyCouponCode}>
                      Apply Coupon
                    </button>
                  </div>
                  {totalAfterDiscount > 0 && (
                    <div className="mb-3">
                      <h4>Discounted Total: Rs. {totalAfterDiscount}</h4>
                      <p className="text-success">Coupon Applied!</p>
                    </div>
                  )}
                  <p>Taxes and shipping calculated at checkout</p>
                  {userCartState && userCartState.length > 0 ? (
                    <Link to="/checkout" className="button">
                      Checkout
                    </Link>
                  ) : (
                    <button disabled className="button bg-secondary">
                      Checkout
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
