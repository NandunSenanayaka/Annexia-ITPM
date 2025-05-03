import React from "react";
import {
  FaWallet,
  FaMoneyCheckAlt,
  FaFileInvoiceDollar,
  FaEnvelope,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./PaymentDashboard.css";

const PaymentDashboard = () => {
  return (
    <div className="payment-container1">
      <aside className="payment-sidebar">
        <h2 className="payment-logo">ANNEXIA</h2>
        <nav>
          <ul>
            <Link to="/PaymentDetails" style={{ textDecoration: "none", color: "inherit" }}>
              <li><FaHome /> Overview</li>
            </Link>

            <Link to="/AddPayment" style={{ textDecoration: "none", color: "inherit" }}>
              <li><FaMoneyCheckAlt /> Add Payment</li>
            </Link>

            <Link to="/invoices" style={{ textDecoration: "none", color: "inherit" }}>
              <li><FaFileInvoiceDollar /> Invoices</li>
            </Link>

            <Link to="/wallet" style={{ textDecoration: "none", color: "inherit" }}>
              <li><FaWallet /> Wallet</li>
            </Link>

            <Link to="/paymentcontact" style={{ textDecoration: "none", color: "inherit" }}>
              <li><FaEnvelope /> Contact</li>
            </Link>
          </ul>
        </nav>

        {/* <button type="button"  className="payment-logout">
          <FaSignOutAlt /> Logout
        </button> */}
        <button type="button"  className="payment-logout">
                <a href="/login"> <FaSignOutAlt /> Logout</a>
                </button>
      </aside>
    </div>
  );
};

export default PaymentDashboard;
