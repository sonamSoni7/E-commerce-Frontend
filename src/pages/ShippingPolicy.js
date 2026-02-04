import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import Meta from "../components/Meta";

const ShippingPolicy = () => {
  return (
    <>
      <Meta title={"Shipping Policy"} />
      <BreadCrumb title="Shipping Policy" />
      <Container class1="policy-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="policy">
              <h3 className="policy-title mb-4">Shipping & Delivery Policy</h3>
              <p>
                We deliver Adisha Jewellery products across India. Orders are usually dispatched within 2-4 working days after payment confirmation. Delivery time may take 5-10 working days, depending on location.
              </p>
              <p>
                Tracking details will be shared once the order is shipped. In case of delay or delivery issues, our support team will assist you.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ShippingPolicy;
