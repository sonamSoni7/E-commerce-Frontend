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
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum = sum + Number(cartState[index].quantity) * cartState[index].price;
      // setTotal(sum);
    }
  }, [cartState]);

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
        style={{ borderBottom: "1px solid var(--color-3b4149)" }}
      >
        <div className="container-xxl">
          <div className="row align-items-center gy-3">

            {/* LOGO */}
            <div className="col-12 col-md-4 col-lg-3 d-flex justify-content-center justify-content-md-start align-items-center gap-3">
              <img
                src="/images/adisha/logo.png"
                alt="Adisha"
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "contain",
                }}
              />
              {/* {productState} */}
              <h2 className="mb-0 text-center text-md-start">
                <Link className="text-decoration-none" to="/">
                  <span
                    style={{
                      fontFamily: "serif",
                      fontSize: "28px",
                      color: "var(--color-febd69)",
                    }}
                  >
                    Adisha
                  </span>
                  <br />
                  <span
                    className="fs-6 text-white text-uppercase"
                    style={{ letterSpacing: "2px" }}
                  >
                    Jewellery
                  </span>
                </Link>
              </h2>
            </div>

            {/* SEARCH */}
            <div className="col-12 col-md-5 col-lg-6">
              <div className="input-group w-100">
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
                />
                <span
                  className="input-group-text border-0"
                  style={{ backgroundColor: "var(--color-febd69)" }}
                >
                  <BsSearch className="text-white" />
                </span>
              </div>
            </div>

            {/* ICONS */}
            <div className="col-12 col-md-3 col-lg-3 d-flex justify-content-center justify-content-md-end">
              <div className="d-flex align-items-center gap-5">

                <Link to="/wishlist">
                  <img
                    src={wishlist}
                    alt="wishlist"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                </Link>

                <Link
                  to={authState?.user ? "/my-profile" : "/login"}
                  className="text-gold text-decoration-none"
                >
                  <img src={user} alt="user" style={{ filter: "brightness(0) invert(1)" }} />
                  {authState?.user ? authState.user.firstname : "Log in"}
                </Link>

                <Link to="/cart" className="position-relative">
                  <img
                    src={cart}
                    alt="cart"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                  <span className="badge bg-white text-dark position-absolute top-0 start-100 translate-middle">
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
              <nav className="d-flex flex-wrap justify-content-center gap-4 text-uppercase">

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
                  <button
                    onClick={handleLogout}
                    className="btn bg-transparent nav-link border-0 text-gold p-0 fw-bold"
                  >
                    Logout
                  </button>
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
