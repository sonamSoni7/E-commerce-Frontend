import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";

const TermAndConditions = () => {
  return (
    <>
      <Meta title={"Term And Conditions"} />
      <BreadCrumb title="Term And Conditions" />
      <Container class1="policy-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="policy">
              <h3 className="policy-title mb-4">Terms and Conditions</h3>

              <div className="policy-section mb-4">
                <h5 className="text-dark fw-bold mb-3">Terms & Conditions</h5>
                <p>
                  By using the Adisha Jewellery website, you agree to follow our terms and conditions. All product images, designs, prices, and content shown on the website belong to Adisha Jewellery.
                </p>
                <p>
                  We make every effort to display accurate product details, but slight variations in colour, size, or appearance may occur due to photography and screen settings. Prices may change without prior notice. Adisha Jewellery reserves the right to cancel any order in case of incorrect pricing, stock issues, or suspected fraud.
                </p>
                <p>
                  All designs, logos, and website content are the exclusive property of Adisha Jewellery and cannot be copied or used without written permission.
                </p>
              </div>

              <div className="policy-section mb-4">
                <h5 className="text-dark fw-bold mb-3">Product Type & Material</h5>
                <p>
                  Adisha Jewellery deals only in silver jewellery.
                </p>
                <p>
                  We do not sell gold, diamond, or imitation jewellery. All products listed on our website are made from silver or silver-based materials.
                </p>
              </div>

              <div className="policy-section mb-4">
                <h5 className="text-dark fw-bold mb-3">Pricing Policy</h5>
                <p>
                  All jewellery is sold on a per-piece basis.
                </p>
                <p>
                  Prices displayed on the website are the final product prices. There is no weight-based or gram-based pricing.
                </p>
              </div>

              <div className="policy-section mb-4">
                <h5 className="text-dark fw-bold mb-3">GST & Tax Policy</h5>
                <p>
                  Currently, Adisha Jewellery is not charging GST on any product.
                </p>
                <p>
                  Prices shown on the website are the final payable amounts.
                </p>
              </div>

              <div className="policy-section mb-4">
                <h5 className="text-dark fw-bold mb-3">Warranty Disclaimer</h5>
                <p>
                  Adisha Jewellery does not provide any warranty on its products.
                </p>
                <p>
                  We are not responsible for damage caused by wear and tear, water exposure, mishandling, accidents, or improper care after delivery.
                </p>
                <p>
                  Customers are advised to handle jewellery carefully.
                </p>
              </div>

              <div className="policy-section mb-4">
                <h5 className="text-dark fw-bold mb-3">Customer Support</h5>
                <p>
                  For any order or product-related queries, please contact:
                </p>
                <p>
                  Email: adisha0006@gmail.com<br />
                  Phone: +91-9310039944<br />
                  Working Hours: Monday to Saturday, 11 AM - 6 PM
                </p>
              </div>

              <div className="policy-section mb-4">
                <h5 className="text-dark fw-bold mb-3">Intellectual Property Rights</h5>
                <p>
                  All designs, logos, images, and content on this website belong exclusively to Adisha Jewellery. Any copying, duplication, or commercial use without permission is strictly prohibited.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default TermAndConditions;
