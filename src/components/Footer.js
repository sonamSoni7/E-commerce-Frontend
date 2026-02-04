import React from "react";
import { Link } from "react-router-dom";
import { BsGithub, BsInstagram } from "react-icons/bs";
const Footer = () => {
  return (
    <>
      {/* Main Footer */}
      <footer className="py-5" style={{ backgroundColor: "var(--color-232f3e)" }}>
        <div className="container-xxl">
          <div className="row gy-4 text-center">

            {/* Contact */}
            <div className="col-lg-4 col-md-6">
              <h5 className="text-white fw-semibold mb-4">
                Contact Us
              </h5>

              <div className="d-flex flex-column align-items-center gap-2">
                <a
                  href="tel:+91-9310039944"
                  className="text-decoration-none text-light"
                >
                  +91-9310039944
                </a>

                <a
                  href="mailto:adisha0006@gmail.com"
                  className="text-decoration-none text-light"
                >
                  adisha0006@gmail.com
                </a>

                <div className="d-flex gap-3 mt-2">
                  <a
                    href="https://www.instagram.com/adisha.co.in/"
                    className="d-flex align-items-center justify-content-center rounded-circle"
                    style={{
                      width: "38px",
                      height: "38px",
                      backgroundColor: "var(--color-3b4149)",
                      color: "white",
                    }}
                  >
                    <BsInstagram className="fs-5" />
                  </a>
                  <a
                    href="https://github.com/Krrish-29"
                    className="d-flex align-items-center justify-content-center rounded-circle"
                    style={{
                      width: "38px",
                      height: "38px",
                      backgroundColor: "var(--color-3b4149)",
                      color: "white",
                    }}
                  >
                    <BsGithub className="fs-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Information */}
            <div className="col-lg-4 col-md-6">
              <h5 className="text-white fw-semibold mb-4">
                Information
              </h5>

              <div className="d-flex flex-column align-items-center gap-2">
                <Link to="/privacy-policy" className="text-light text-decoration-none">
                  Privacy Policy
                </Link>
                <Link to="/refund-policy" className="text-light text-decoration-none">
                  Payment, Return & Refund Policy
                </Link>
                <Link to="/shipping-policy" className="text-light text-decoration-none">
                  Shipping & Delivery Policy
                </Link>
                <Link to="/term-conditions" className="text-light text-decoration-none">
                  Terms & Conditions
                </Link>
              </div>
            </div>

            {/* Account */}
            <div className="col-lg-4 col-md-6">
              <h5 className="text-white fw-semibold mb-4">
                Account
              </h5>

              <div className="d-flex flex-column align-items-center gap-2">
                <Link to="/about" className="text-light text-decoration-none">
                  About Us
                </Link>
                <Link to="/contact" className="text-light text-decoration-none">
                  Contact
                </Link>
              </div>
            </div>

          </div>
        </div>
      </footer>

      {/* Bottom Footer */}
      <footer
        className="py-3"
        style={{ backgroundColor: "var(--color-131921)" }}
      >
        <div className="container-xxl">
          <p className="text-center mb-0 text-light">
            &copy; {new Date().getFullYear()} Powered by{" "}
            <span style={{ color: "var(--color-febd69)", fontWeight: 500 }}>
              Adisha Jewellery
            </span>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
