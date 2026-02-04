import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";

const ReturnAndRefundPolicy = () => {
    return (
        <>
            <Meta title={"Return & Refund Policy"} />
            <BreadCrumb title="Return & Refund Policy" />
            <Container class1="policy-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <div className="policy">
                            <h3 className="policy-title mb-4">Payment, Return & Refund Policy</h3>

                            <div className="policy-section mb-4">
                                <h5 className="text-dark fw-bold mb-3">Payment Policy</h5>
                                <p>
                                    Adisha Jewellery accepts only prepaid payments. Cash on Delivery (COD) is not available.
                                </p>
                                <p>
                                    All payments must be completed through our secure online payment gateway before order processing.
                                </p>
                                <p>
                                    Orders will be confirmed only after successful payment.
                                </p>
                            </div>

                            <div className="policy-section mb-4">
                                <h5 className="text-dark fw-bold mb-3">Return & Refund Policy</h5>
                                <p>
                                    Due to the nature of premium jewellery, no returns, exchanges, or refunds are allowed once an order is placed and delivered.
                                </p>
                                <p>
                                    Customers are requested to check product details, size, and images carefully before placing an order. We do not accept returns for change of mind, personal preference, or incorrect selection.
                                </p>
                                <p>
                                    In case of transit damage or wrong item delivery, customers must inform us within 12 hours of receiving the product with proper photos for verification.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default ReturnAndRefundPolicy;
