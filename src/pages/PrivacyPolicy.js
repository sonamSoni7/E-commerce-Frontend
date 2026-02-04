import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";

const PrivacyPolicy = () => {
  return (
    <>
      <Meta title={"Privacy Policy"} />
      <BreadCrumb title="Privacy Policy" />
      <Container class1="policy-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="policy">
              <h3 className="policy-title mb-4">Privacy Policy</h3>
              <p>
                At Adisha Jewellery, we respect and protect your privacy. When you visit or shop on our website, we collect personal information such as your name, phone number, email address, shipping address, and payment details. This information is used only for processing your orders, delivering products, and providing customer support.
              </p>
              <p>
                We do not sell or misuse your personal data. Your information is shared only with trusted payment gateways and delivery partners for order completion. We use secure systems to protect your data.
              </p>
              <p>
                We may also use cookies to improve website experience. You have the right to access, update, or request deletion of your personal information by contacting us.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default PrivacyPolicy;
