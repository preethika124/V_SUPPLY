import { useEffect, useState } from "react";

import {
  getSupplierOrders,
  acceptOrder,
  rejectOrder
} from "../services/orderService";

import "../styles/supplierOrders.css";

function SupplierOrders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const response =
        await getSupplierOrders(token);

      setOrders(response.data);

    } catch (err) {
      console.log(err);
    }
  };

  const handleAccept = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await acceptOrder(id, token);

      loadOrders();

    } catch (err) {
      console.log(err);
    }
  };

  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await rejectOrder(id, token);

      loadOrders();

    } catch (err) {
      console.log(err);
    }
  };

  const getStatusClass = (status) => {

    if (status === "ACCEPTED") {
      return "accepted";
    }

    if (status === "REJECTED") {
      return "rejected";
    }

    return "pending";
  };

  return (
    <div className="supplier-orders-page">

      <div className="supplier-orders-header">
      
      </div>

      {orders.length === 0 && (
        <div className="empty-orders">
          No Incoming Orders
        </div>
      )}

      {orders.map((order) => (

        <div
          key={order.id}
          className="supplier-order-card"
        >

          <div className="supplier-order-top">

            <div>

              <h3>
                Order #
                {String(order.id).slice(0, 8)}
              </h3>

              <p>
                Vendor :
                <strong>
                  {order.vendor_name}
                </strong>
              </p>

              <p>
                Shop :
                <strong>
                  {order.shop_name}
                </strong>
              </p>

              <p>
                Phone :
                <strong>
                  {order.phone}
                </strong>
              </p>

            </div>

            <div>

              <span
                className={`status-badge ${getStatusClass(order.status)}`}
              >
                {order.status}
              </span>

            </div>

          </div>

          <div className="supplier-order-bottom">

            <div>

              <p>Total Amount</p>

              <h2>
                ₹{order.total_amount}
              </h2>

            </div>

            <div>

              <p>Ordered On</p>

              <strong>
                {new Date(order.created_at).toLocaleDateString()}
              </strong>

            </div>

          </div>

          {order.status === "PENDING" && (

            <div className="order-actions">

              <button
                className="accept-btn"
                onClick={() => handleAccept(order.id)}
              >
                Accept
              </button>

              <button
                className="reject-btn"
                onClick={() => handleReject(order.id)}
              >
                Reject
              </button>

            </div>

          )}

        </div>

      ))}

    </div>
  );
}

export default SupplierOrders;