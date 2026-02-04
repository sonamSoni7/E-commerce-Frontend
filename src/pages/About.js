import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";

const About = () => {
  return (
    <>
      <Meta title={"About Us"} />
      <BreadCrumb title="About Us" />
      <Container class1="policy-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="policy">
              <h3 className="policy-title mb-4">About Adisha Jewellery</h3>

              <div className="policy-section mb-4">
                <p className="lead mb-4" style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
                  Adisha Jewellery is a premium silver jewellery brand created for those who love elegance and meaning in every detail.
                  Each piece is thoughtfully designed to reflect beauty, purity, and modern style.
                </p>

                <p className="mb-4" style={{ lineHeight: "1.8" }}>
                  We believe jewellery should do more than shine — it should express who you are.
                  At Adisha, where <strong>beauty becomes divine</strong>, every creation is made to add grace and confidence to your everyday moments.
                </p>

                <div className="row mt-5">
                  <div className="col-md-4 mb-4">
                    <div className="text-center p-4 bg-light rounded">
                      <h4 className="mb-3" style={{ color: "var(--color-febd69)" }}>💎</h4>
                      <h5 className="fw-bold mb-2">Premium Quality</h5>
                      <p className="text-muted mb-0">Crafted with finest silver and attention to detail</p>
                    </div>
                  </div>
                  <div className="col-md-4 mb-4">
                    <div className="text-center p-4 bg-light rounded">
                      <h4 className="mb-3" style={{ color: "var(--color-febd69)" }}>✨</h4>
                      <h5 className="fw-bold mb-2">Timeless Design</h5>
                      <p className="text-muted mb-0">Modern elegance meets traditional craftsmanship</p>
                    </div>
                  </div>
                  <div className="col-md-4 mb-4">
                    <div className="text-center p-4 bg-light rounded">
                      <h4 className="mb-3" style={{ color: "var(--color-febd69)" }}>❤️</h4>
                      <h5 className="fw-bold mb-2">Made with Love</h5>
                      <p className="text-muted mb-0">Every piece tells a story of passion and artistry</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default About;

