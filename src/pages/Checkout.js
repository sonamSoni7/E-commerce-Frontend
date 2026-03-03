import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { config } from "../utils/axiosConfig";
import {
  createAnOrder,
  getUserCart,
  resetState,
  getCouponStatus,
} from "../features/user/userSlice";

let shippingSchema = yup.object({
  firstname: yup.string().required("First Name is Required"),
  lastname: yup.string().required("Last Name is Required"),
  address: yup.string().required("Address Details are Required"),
  state: yup.string().required("State is Required"),
  city: yup.string().required("city is Required"),
  country: yup.string().required("country is Required"),
  pincode: yup.number("Pincode No is Required").required().positive().integer(),
});

const SHIPPING = 100;

const Checkout = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state?.auth?.cartProducts);
  const authState = useSelector((state) => state?.auth);
  const couponStatus = useSelector((state) => state?.auth?.couponStatus);

  // itemsSubtotal: sum of cart item prices (no discount, no shipping)
  const [itemsSubtotal, setItemsSubtotal] = useState(0);
  // discountedItems: items after coupon discount (no shipping)
  const [discountedItems, setDiscountedItems] = useState(null);
  // Track whether THIS checkout session placed an order (prevents stale redirect)
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [, setShippingInfo] = useState(null);
  const navigate = useNavigate();

  const getTokenFromLocalStorage = localStorage.getItem("customer")
    ? JSON.parse(localStorage.getItem("customer"))
    : null;

  const config2 = {
    headers: {
      Authorization: `Bearer ${getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
        }`,
      Accept: "application/json",
    },
  };

  // On mount: load cart and check coupon validity
  useEffect(() => {
    dispatch(getUserCart(config2));
    dispatch(getCouponStatus());
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Compute items subtotal from cart
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum = sum + Number(cartState[index].quantity) * cartState[index].price;
    }
    setItemsSubtotal(sum);
  }, [cartState]);

  // Sync discounted items from coupon status (populated on page load)
  useEffect(() => {
    if (couponStatus?.applied && couponStatus.totalAfterDiscount) {
      setDiscountedItems(Number(couponStatus.totalAfterDiscount));
    } else if (couponStatus?.expired) {
      // Coupon was found expired — clear discount
      setDiscountedItems(null);
    }
  }, [couponStatus]);

  // Also listen to cartProduct from Redux (set when user applies coupon on Cart page)
  useEffect(() => {
    const cp = authState?.cartProduct;
    if (cp && typeof cp !== "object") {
      setDiscountedItems(Number(cp));
    }
  }, [authState?.cartProduct]);

  // Navigate to My Orders ONLY after THIS checkout session's order is created
  useEffect(() => {
    if (
      orderPlaced &&
      authState?.orderedProduct?.order !== null &&
      authState?.orderedProduct?.success === true
    ) {
      navigate("/my-orders");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState, orderPlaced]);

  const [, setCartProductState] = useState([]);

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      address: "",
      state: "",
      city: "",
      country: "",
      pincode: "",
      other: "",
    },
    validationSchema: shippingSchema,
    onSubmit: (values) => {
      setShippingInfo(values);
      localStorage.setItem("address", JSON.stringify(values));
      setTimeout(() => {
        checkOutHandler();
      }, 300);
    },
  });

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    let items = [];
    for (let index = 0; index < cartState?.length; index++) {
      items.push({
        product: cartState[index].productId._id,
        quantity: cartState[index].quantity,
        color: cartState[index].color._id,
        price: cartState[index].price,
      });
    }
    setCartProductState(items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkOutHandler = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to Load");
      return;
    }

    // The backend /checkout endpoint calculates:
    //   discountedItems + Rs. 100 shipping = finalAmount (in paise via Razorpay)
    const result = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/api/user/order/checkout`,
      {},
      config
    );

    if (!result) {
      alert("Something Went Wrong");
      return;
    }

    const { amount, id: order_id, currency } = result.data.order;

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: amount,
      currency: currency,
      name: "Adisha Jewellery",
      description: "Test Transaction",
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const verificationResult = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/api/user/order/paymentVerification`,
          data,
          config
        );

        // Pass the Razorpay-charged amount (paise) — backend uses it as
        // the ground-truth totalPriceAfterDiscount stored on the order.
        // Backend createOrder will also handle Cart.deleteMany — do NOT
        // dispatch deleteUserCart separately (race condition).
        setOrderPlaced(true); // flag THIS session as having placed an order
        dispatch(
          createAnOrder({
            paymentInfo: { ...verificationResult.data, amount },
            shippingInfo: JSON.parse(localStorage.getItem("address")),
          })
        );
        localStorage.removeItem("address");
        dispatch(resetState());
      },
      prefill: {
        name: "Adisha Jewellery",
        email: "adisha0006@gmail.com",
        contact: "+91-9310039944",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  // Displayed totals
  // totalPayable = (discounted items if coupon else items) + shipping
  const effectiveItems = discountedItems !== null ? discountedItems : itemsSubtotal;
  const totalPayable = effectiveItems + SHIPPING;
  const isCouponApplied = discountedItems !== null && couponStatus?.applied;

  return (
    <>
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12 col-md-7">
            <div className="checkout-left-data">
              <h3 className="website-name">Adisha Jewellery</h3>
              <nav
                style={{ "--bs-breadcrumb-divider": ">" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className="text-dark total-price" to="/cart">
                      Cart
                    </Link>
                  </li>
                  &nbsp; /&nbsp;
                  <li
                    className="breadcrumb-ite total-price active"
                    aria-current="page"
                  >
                    Information
                  </li>
                  &nbsp; /
                  <li className="breadcrumb-item total-price active">
                    Shipping
                  </li>
                  &nbsp; /
                  <li
                    className="breadcrumb-item total-price active"
                    aria-current="page"
                  >
                    Payment
                  </li>
                </ol>
              </nav>
              <h4 className="title total">Contact Information</h4>
              <p className="user-details total">
                Adisha (adisha@gmail.com)
              </p>
              <h4 className="mb-3">Shipping Address</h4>
              <form
                onSubmit={formik.handleSubmit}
                action=""
                className="d-flex gap-15 flex-wrap justify-content-between"
              >
                <div className="w-100">
                  <select
                    className="form-control form-select"
                    id=""
                    name="country"
                    value={formik.values.country}
                    onChange={formik.handleChange("country")}
                    onBlur={formik.handleChange("country")}
                  >
                    <option value="" selected disabled>
                      Select Country
                    </option>
                    <option value="India">India</option>
                  </select>
                  <div className="error ms-2 my-1">
                    {formik.touched.country && formik.errors.country}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="form-control"
                    name="firstname"
                    value={formik.values.firstname}
                    onChange={formik.handleChange("firstname")}
                    onBlur={formik.handleBlur("firstname")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.firstname && formik.errors.firstname}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="form-control"
                    name="lastname"
                    value={formik.values.lastname}
                    onChange={formik.handleChange("lastname")}
                    onBlur={formik.handleBlur("lastname")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.lastname && formik.errors.lastname}
                  </div>
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Address"
                    className="form-control"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange("address")}
                    onBlur={formik.handleBlur("address")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.address && formik.errors.address}
                  </div>
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Apartment, Suite ,etc"
                    className="form-control"
                    name="other"
                    value={formik.values.other}
                    onChange={formik.handleChange("other")}
                    onBlur={formik.handleBlur("other")}
                  />
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="City"
                    className="form-control"
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange("city")}
                    onBlur={formik.handleBlur("city")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.city && formik.errors.city}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <select
                    className="form-control form-select"
                    id=""
                    name="state"
                    value={formik.values.state}
                    onChange={formik.handleChange("state")}
                    onBlur={formik.handleChange("state")}
                  >
                    <option value="" selected disabled>
                      Select State
                    </option>
                    <option>Andhra Pradesh</option>
                    <option>Arunachal Pradesh</option>
                    <option>Assam</option>
                    <option>Bihar</option>
                    <option>Chhattisgarh</option>
                    <option>Goa</option>
                    <option>Gujarat</option>
                    <option>Haryana</option>
                    <option>Himachal Pradesh</option>
                    <option>Jharkhand</option>
                    <option>Karnataka</option>
                    <option>Kerala</option>
                    <option>Madhya Pradesh</option>
                    <option>Maharashtra</option>
                    <option>Manipur</option>
                    <option>Meghalaya</option>
                    <option>Mizoram</option>
                    <option>Nagaland</option>
                    <option>Odisha</option>
                    <option>Punjab</option>
                    <option>Rajasthan</option>
                    <option>Sikkim</option>
                    <option>Tamil Nadu</option>
                    <option>Telangana</option>
                    <option>Tripura</option>
                    <option>Uttar Pradesh</option>
                    <option>Uttarakhand</option>
                    <option>West Bengal</option>
                    <option>Andaman and Nicobar Islands</option>
                    <option>Chandigarh</option>
                    <option>Dadra and Nagar Haveli and Daman and Diu</option>
                    <option>Delhi</option>
                    <option>Jammu and Kashmir</option>
                    <option>Ladakh</option>
                    <option>Lakshadweep</option>
                    <option>Puducherry</option>
                  </select>
                  <div className="error ms-2 my-1">
                    {formik.touched.state && formik.errors.state}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Pincode"
                    className="form-control"
                    name="pincode"
                    value={formik.values.pincode}
                    onChange={formik.handleChange("pincode")}
                    onBlur={formik.handleBlur("pincode")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.pincode && formik.errors.pincode}
                  </div>
                </div>
                <div className="w-100">
                  <div className="d-flex flex-wrap justify-content-between align-items-center">
                    <Link to="/cart" className="text-dark mb-3">
                      <BiArrowBack className="me-2" />
                      Return to Cart
                    </Link>
                    <Link to="/cart" className="button mb-3">
                      Continue to Shipping
                    </Link>
                    <button className="button mb-3" type="submit">
                      Place Order
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-12 col-md-5">
            <div className="border-bottom py-4">
              {cartState &&
                cartState?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="d-flex align-items-center justify-content-between mb-2 gap-3"
                    >
                      {/* LEFT: Image + Details */}
                      <div className="d-flex align-items-start gap-3 flex-grow-1">

                        {/* IMAGE */}
                        <img
                          src={
                            item?.productId?.images[0]?.url?.startsWith("/")
                              ? `${process.env.REACT_APP_API_BASE_URL}${item?.productId?.images[0]?.url}`
                              : item?.productId?.images[0]?.url
                          }
                          alt="product"
                          className="img-fluid rounded"
                          style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "contain",
                          }}
                        />

                        {/* PRODUCT DETAILS */}
                        <div className="d-flex flex-column">
                          <h5
                            style={{
                              fontSize: "15px",
                              fontWeight: "500",
                              color: "var(--color-1c1c1b)",
                              marginBottom: "4px",
                            }}
                          >
                            {item?.productId?.title}
                          </h5>

                          <div className="d-flex align-items-center gap-2">
                            <span style={{ fontSize: "13px" }}>Color:</span>
                            <ul className="colors ps-0 mb-0">
                              <li
                                style={{
                                  backgroundColor: item?.color?.title,
                                  width: "15px",
                                  height: "15px",
                                }}
                              ></li>
                            </ul>
                          </div>

                          <span style={{ fontSize: "13px" }}>Price: Rs. {item?.price}</span>
                          <span style={{ fontSize: "13px" }}>Quantity: {item?.quantity}</span>
                        </div>
                      </div>

                      {/* RIGHT: TOTAL */}
                      <div
                        className="text-end"
                        style={{ minWidth: "90px" }}
                      >
                        <h5 className="total mb-0">
                          Rs. {(item?.price * item?.quantity).toFixed(2)}
                        </h5>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="border-bottom py-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="total">Subtotal (items)</p>
                <p className="total-price">
                  Rs. {Number(itemsSubtotal).toFixed(2)}
                </p>
              </div>
              {isCouponApplied && (
                <div className="d-flex justify-content-between align-items-center text-success">
                  <p className="mb-0 total">
                    Coupon Discount
                    {couponStatus?.name ? ` (${couponStatus.name})` : ""}
                    {couponStatus?.discount ? ` – ${couponStatus.discount}%` : ""}
                  </p>
                  <p className="mb-0 total-price">
                    – Rs. {(itemsSubtotal - discountedItems).toFixed(2)}
                  </p>
                </div>
              )}
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 total">Shipping</p>
                <p className="mb-0 total-price">Rs. {SHIPPING}.00</p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center border-bottom py-4">
              <h4 className="total">Total</h4>
              <h5 className="total-price">
                Rs. {Number(totalPayable).toFixed(2)}
              </h5>
            </div>
            {isCouponApplied && (
              <p className="text-muted small mt-2">
                Items after discount: Rs. {Number(discountedItems).toFixed(2)} + Rs. {SHIPPING} shipping
              </p>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
