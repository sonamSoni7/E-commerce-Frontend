import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import wishlist from "../images/wishlist.svg";
import user from "../images/user.svg";
import cart from "../images/cart.svg";
import { useDispatch, useSelector } from "react-redux";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { getAProduct } from "../features/products/productSlilce";
import { getUserCart } from "../features/user/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state?.auth?.cartProducts);
  const authState = useSelector((state) => state?.auth);
  // const [total, setTotal] = useState(null);
  const productState = useSelector((state) => state?.product?.product);
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

  const navItemStyle = {
    color: "white",
    textTransform: "uppercase",
    fontSize: "14px",
    fontWeight: "500",
    textDecoration: "none",
    letterSpacing: "0.5px",
  };

  useEffect(() => {
    dispatch(getUserCart(config2));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [productOpt, setProductOpt] = useState([]);

  useEffect(() => {
    let data = [];
    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      data.push({ id: index, prod: element?._id, name: element?.title });
    }
    setProductOpt(data);
  }, [productState]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <>
      <header
        className="header-upper py-3"
        style={{ borderBottom: "1px solid var(--color-3b4149)" }}>
        <div className="container-xxl">
          {/* LOGO */}
          <Link className="text-decoration-none align-items-center d-flex" to="/">
            <img
              src="/images/adisha/logo.png"
              alt="Adisha Jewellery"
              className="img-fluid"
              style={{
                maxHeight: "90px",
                objectFit: "contain",
              }}
            />
            <h2 className="ms-2 ms-sm-3 ms-md-4 ms-lg-5" style={{ color: "var(--color-febd69)",fontFamily:"'Imperial Script', cursive",fontSize:"65px",fontWeight:400 }}>Adisha</h2>
          </Link>

          <div className="row align-items-center mt-3">
            {/* SEARCH BAR */}
            <div className="col-12 col-lg-6 order-1 order-lg-2 d-flex justify-content-center">
              <div className="input-group w-100 w-lg-75">
                <Typeahead
                  id="product-search"
                  options={productOpt}
                  labelKey="name"
                  placeholder="Search for timeless elegance..."
                  className="w-100"
                  onChange={(selected) => {
                    if (selected.length) {
                      navigate(`/product/${selected[0]?.prod}`);
                      dispatch(getAProduct(selected[0]?.prod));
                    }
                  }}
                  minLength={2}
                />
                <span
                  className="input-group-text border-0"
                  style={{
                    backgroundColor: "var(--color-febd69)",
                    cursor: "pointer",
                  }}
                >
                  <BsSearch className="text-white" />
                </span>
              </div>
            </div>

            {/* ICONS */}
            <div className="col-12 col-lg-4 order-2 order-lg-3 mt-3 mt-lg-0">
              <div className="d-flex justify-content-center justify-content-lg-end gap-4 gap-sm-4 gap-md-5 gap-lg-5 gap-xl-5">

                <Link to="/wishlist" className="text-white">
                  <img
                    src={wishlist}
                    alt="wishlist"
                    style={{ filter: "brightness(0) invert(1)", width: "35px" }}
                  />
                </Link>

                <Link
                  to={authState?.user ? "/my-profile" : "/login"}
                  className="d-flex align-items-center gap-1 text-white text-decoration-none"
                >
                  <img
                    src={user}
                    alt="user"
                    style={{ filter: "brightness(0) invert(1)", width: "35px" }}
                  />
                  <span className="d-none d-lg-block" style={{ fontSize: "13px" }}>
                    {authState?.user ? authState.user.firstname : "Log in"}
                  </span>
                </Link>

                <Link
                  to="/cart"
                  className="text-white position-relative"
                >
                  <img
                    src={cart}
                    alt="cart"
                    style={{ filter: "brightness(0) invert(1)", width: "35px" }}
                  />
                  <span
                    className="badge bg-white text-dark rounded-circle"
                    style={{
                      fontSize: "10px",
                      position: "absolute",
                      top: "-5px",
                      right: "-8px",
                    }}
                  >
                    {cartState?.length || 0}
                  </span>
                </Link>

              </div>
            </div>

          </div>
        </div>
      </header>
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <nav className="d-flex flex-wrap justify-content-center gap-1 gap-sm-2 gap-md-3 gap-lg-4 gap-xl-5 text-uppercase">

                <NavLink to="/" className="text-gold fw-bold p-1" style={navItemStyle}>
                  Home
                </NavLink>


                <NavLink to="/product" style={navItemStyle} className="text-gold fw-bold p-1">
                  Our Store
                </NavLink>

                <NavLink to="/contact" style={navItemStyle} className="text-gold fw-bold p-1">
                  Contact
                </NavLink>

                {authState?.user && (
                  <NavLink to="/my-orders" style={navItemStyle} className="text-gold fw-bold p-1">
                    My Orders
                  </NavLink>
                )}
                {authState?.user ? (
                  <button
                    onClick={handleLogout}
                    className="btn bg-transparent nav-link border-0 text-gold p-0 fw-bold"
                  >
                    Logout
                  </button>
                ):
                (
                  <NavLink to="/login" style={navItemStyle} className="text-gold fw-bold p-1">
                    Login
                  </NavLink>
                )}
              </nav>
            </div>
          </div>
        </div>
      </header>

    </>
  );
};

export default Header;
