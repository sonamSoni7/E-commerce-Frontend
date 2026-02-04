import React, { useEffect } from "react";
import Container from "../components/Container";
import BreadCrumb from "../components/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/user/userSlice";

const Orders = () => {
  const dispatch = useDispatch();
  const orderState = useSelector(
    (state) => state?.auth?.getorderedProduct?.orders
  );

  const getTokenFromLocalStorage = localStorage.getItem("customer")
    ? JSON.parse(localStorage.getItem("customer"))
    : null;

  const config2 = {
    headers: {
      Authorization: `Bearer ${
        getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
      }`,
      Accept: "application/json",
    },
  };

  useEffect(() => {
    dispatch(getOrders(config2));
  }, []);

  return (
    <>
      <BreadCrumb title="My Orders" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <h3 className="mb-4">My Orders History</h3>
            
            <div className="col-12">
              {orderState && orderState?.length > 0 ? (
                orderState?.map((item, index) => {
                  return (
                    <div 
                      key={index} 
                      className="row my-3 bg-white pt-3 pb-3"
                      style={{ border: "1px solid #ebedf2", borderRadius: "10px" }}
                    >
                      {/* Order Summary Header */}
                      <div className="col-12 border-bottom pb-3 mb-3">
                        <div className="row">
                          <div className="col-12 col-md-4 mb-2 mb-md-0">
                            <span className="text-muted d-block small">Order ID</span>
                            <span className="fw-bold text-dark">{item?._id}</span>
                          </div>
                          <div className="col-12 col-md-4 mb-2 mb-md-0">
                            <span className="text-muted d-block small">Total Amount</span>
                            <span className="fw-bold text-dark">Rs. {item?.totalPrice}</span>
                          </div>
                          <div className="col-12 col-md-4">
                            <span className="text-muted d-block small">Status</span>
                            <span 
                              className={`badge rounded-pill px-3 py-2 ${
                                item?.orderStatus === "Pending" ? "bg-info" : 
                                item?.orderStatus === "Delivered" ? "bg-success" : 
                                item?.orderStatus === "Cancelled" ? "bg-danger" : "bg-warning text-dark"
                              }`}
                              style={{fontSize: "12px"}}
                            >
                              {item?.orderStatus}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="col-12">
                        <h6 className="mb-3 text-muted" style={{fontSize: "14px"}}>Ordered Items</h6>
                        {item?.orderItems?.map((i, k) => (
                          <div key={k} className="row mb-3 align-items-center p-2 rounded" style={{ backgroundColor: "#f9f9f9" }}>
                            <div className="col-12 col-md-5 mb-2 mb-md-0">
                              <p className="mb-0 fw-bold">{i?.product?.title}</p>
                            </div>
                            <div className="col-4 col-md-2 text-center">
                              <span className="text-muted small d-block">Qty</span>
                              <span className="fw-bold">{i?.quantity}</span>
                            </div>
                            <div className="col-4 col-md-2 text-center">
                              <span className="text-muted small d-block">Price</span>
                              <span className="fw-bold">Rs. {i?.price}</span>
                            </div>
                            <div className="col-4 col-md-3 text-center">
                              <span className="text-muted small d-block mb-1">Color</span>
                              <div 
                                style={{
                                  width: "20px", 
                                  height: "20px", 
                                  backgroundColor: i?.color?.title, 
                                  borderRadius: "50%",
                                  margin: "0 auto",
                                  border: "1px solid #ddd"
                                }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center w-100 p-5 bg-white rounded">
                  <h5>No Orders Found</h5>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Orders;
