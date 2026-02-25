import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import Marquee from "react-fast-marquee";
import Container from "../components/Container";
// import { services } from "../utils/Data";
// import wish from "../images/wish.svg";
// import wishlist from "../images/wishlist.svg";
import ProductCard from "../components/ProductCard";
// import SpecialProduct from "../components/SpecialProduct";

import { useDispatch, useSelector } from "react-redux";
// import moment from "moment";
import { getAllProducts } from "../features/products/productSlilce";
// import ReactStars from "react-rating-stars-component";
// import { addToWishlist } from "../features/products/productSlilce";
// import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const Home = () => {
  const productState = useSelector((state) => state?.product?.product);

  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const getProducts = () => {
    dispatch(getAllProducts());
  };

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{fontFamily:"'EB Garamond', serif"}}>
      <Container class1="home-wrapper-1 py-0 bg-cream">
        <div className="row">
          <div className="col-12 p-0">
            <div className="main-banner position-relative" style={{ minHeight: "35vh" }}>
              <img
                src="/images/adisha/hero_bg.png"
                className="img-fluid rounded-1 w-100 h-100 top-0 start-0"
                alt="main banner"
                style={{ objectFit: "cover" }}
              />
              <div className="main-banner-content position-absolute text-center d-flex flex-column justify-content-center align-items-center px-3 px-md-5" style={{ inset: 0, background: "rgba(0,0,0,0.35)" }}>
                <h4 className="text-gold mb-2 text-uppercase" style={{ letterSpacing: "3px", fontSize: "clamp(0.75rem, 2vw, 1rem)" }}>Premium Handcrafted Jewelry</h4>
                <h5 className="text-white mb-3" style={{ fontSize: "clamp(1.6rem, 5vw, 3rem)", lineHeight: "1.2",letterSpacing:"0.5px" }}>Discover Timeless Elegance</h5>
                <p className="text-white mb-4" style={{ fontSize: "clamp(0.9rem, 3vw, 1.2rem)", maxWidth: "600px" }}>From stunning necklaces to exquisite bracelets.</p>
                <Link className="button text-uppercase px-4 py-2" to="/product">Shop Our Collection</Link>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12 text-center mb-5">
            <h3 className="section-heading" style={{ fontSize: "2.5rem" }}>Shop By Collection</h3>
            <p className="text-muted">Explore our curated collections designed for every occasion.</p>
          </div>

          <div className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="card border-0 rounded-3 overflow-hidden position-relative company-card">
              <img src="/images/adisha/collection_women.png" alt="Women" className="img-fluid w-100" style={{ aspectRatio: "3/4", objectFit: "cover" }} />
              <div className="card-overlay position-absolute bottom-0 start-0 w-100 p-4" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)" }}>
                <h4 className="text-white mb-1">Women's Collection</h4>
                <p className="text-white-50 mb-0">Elegant pieces for every woman</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="card border-0 rounded-3 overflow-hidden position-relative company-card">
              <img src="/images/adisha/collection_men.png" alt="Men" className="img-fluid w-100" style={{ aspectRatio: "3/4", objectFit: "cover" }} />
              <div className="card-overlay position-absolute bottom-0 start-0 w-100 p-4" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)" }}>
                <h4 className="text-white mb-1">Men's Collection</h4>
                <p className="text-white-50 mb-0">Bold and sophisticated designs</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="card border-0 rounded-3 overflow-hidden position-relative company-card">
              <img src="/images/adisha/accessories.png" alt="Accessories" className="img-fluid w-100" style={{ aspectRatio: "3/4", objectFit: "cover" }} />
              <div className="card-overlay position-absolute bottom-0 start-0 w-100 p-4" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)" }}>
                <h4 className="text-white mb-1">Accessories</h4>
                <p className="text-white-50 mb-0">Complete your look</p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Why Choose Us Section */}
      <Container class1="home-wrapper-2 py-5 bg-cream">
        <div className="row align-items-center">
          <div className="col-12 col-md-6 mb-4 mb-md-0">
            <div className="position-relative">
              <img src="/images/adisha/accessories.png" className="img-fluid rounded-3" alt="Why Choose Us" />
              <div className="position-absolute p-4 rounded-3 text-center" style={{ bottom: "20px", right: "20px", background: "var(--color-febd69)", color: "white", minWidth: "160px" }}>
                <h2 className="mb-0 fw-bold">10+</h2>
                <p className="mb-0">Years Experience</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 ps-md-5">
            <h3 className="section-heading mb-4" style={{ fontFamily: "serif", fontSize: "2.5rem" }}>Why Choose Adisha Jewellery?</h3>
            <p className="text-muted mb-5">We're committed to providing you with the finest jewellery pieces that combine exceptional craftsmanship, timeless design, and affordable luxury.</p>

            <div className="d-flex flex-column gap-4">
              <div className="d-flex align-items-start gap-3">
                <div className="rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ background: "#fdf3e0", width: "50px", height: "50px" }}>
                  <span className="" style={{ color: "var(--color-bf4800)" }}>💎</span>
                </div>
                <div>
                  <h5 className="mb-1 fw-bold">Authentic Quality</h5>
                  <p className="text-muted mb-0 font-size-14">Every piece is carefully crafted and certified to ensure you receive genuine, high-quality jewellery.</p>
                </div>
              </div>
              <div className="d-flex align-items-start gap-3">
                <div className="rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ background: "#fdf3e0", width: "50px", height: "50px" }}>
                  <span className="" style={{ color: "var(--color-bf4800)" }}>👐</span>
                </div>
                <div>
                  <h5 className="mb-1 fw-bold">Handcrafted with Care</h5>
                  <p className="text-muted mb-0 font-size-14">Our skilled artisans pour their passion into every design, creating unique pieces that tell a story.</p>
                </div>
              </div>
              <div className="d-flex align-items-start gap-3">
                <div className="rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ background: "#fdf3e0", width: "50px", height: "50px" }}>
                  <span className="" style={{ color: "var(--color-bf4800)" }}>🏷️</span>
                </div>
                <div>
                  <h5 className="mb-1 fw-bold">Affordable Luxury</h5>
                  <p className="text-muted mb-0 font-size-14">Premium jewellery shouldn't break the bank. We offer competitive prices without compromising quality.</p>
                </div>
              </div>
              <div className="d-flex align-items-start gap-3">
                <div className="rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ background: "#fdf3e0", width: "50px", height: "50px" }}>
                  <span className="" style={{ color: "var(--color-bf4800)" }}>🎧</span>
                </div>
                <div>
                  <h5 className="mb-1 fw-bold">Expert Support</h5>
                  <p className="text-muted mb-0 font-size-14">Our friendly team is here to help you find the perfect piece and answer all your questions.</p>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <Link to="/about" className="button text-uppercase" style={{ backgroundColor: "var(--color-febd69)", border: "none" }}>Learn More About Us</Link>
            </div>
          </div>
        </div>
      </Container>


      <Container class1="featured-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12 text-center">
            <h3 className="section-heading text-uppercase" style={{ fontFamily: "serif", letterSpacing: "2px" }}>Premium Products</h3>
            <p className="text-muted mb-5">Handpicked selections from our newest arrivals.</p>
          </div>
          <ProductCard data={productState && productState?.filter((item) => item.tags === "premium")} />
        </div>
      </Container>

      <Container class1="special-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12 text-center">
            <h3 className="section-heading text-uppercase" style={{ fontFamily: "serif", letterSpacing: "2px" }}>Our Special Products</h3>
          </div>
        </div>
        <div className="row">
          <ProductCard data={productState && productState?.filter((item) => item.tags === "special")} />
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12 text-center">
            <h3 className="section-heading text-uppercase" style={{ fontFamily: "serif", letterSpacing: "2px" }}>Our Popular Products</h3>
          </div>
        </div>
        <div className="row">
          <ProductCard data={productState && productState?.filter((item) => item.tags === "popular")} />
        </div>
      </Container>
    </div>
  );
};

export default Home;
