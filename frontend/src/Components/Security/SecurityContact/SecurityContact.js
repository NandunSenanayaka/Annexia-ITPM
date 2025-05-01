// import React from "react";
// import SecurityOverview from "../SecurityDashboard/SecurityDashboard";
// import "./SecurityContact.css";

// const SecurityContact = () => {
//   return (
//     <div className="security-contact-container">
//       <SecurityOverview />
//       <div className="security-contact-content">
//         <h1>Security Contact</h1>
//       </div>
//     </div>
//   );
// };

// export default SecurityContact;







import React from "react";
import SecurityOverview from "../SecurityDashboard/SecurityDashboard";
import "./SecurityContact.css";

const SecurityContact = () => {
  return (
    <div className="security-contact-container">
      <SecurityOverview />
      <div className="security-contact-content">
        <h1>Security Contact - Sri Lanka</h1>

        <div className="tips-section">
          <h2>Annexia Contact</h2>
          <ul>
            <li><strong>Owner :</strong> +94 11 5998996</li>
            <li><strong>Security :</strong> +94 11 7534796</li>
            <li><strong>Cleaner Manager :</strong> +94 11 4258258</li>
          </ul>
        </div>

        <div className="emergency-section">
          <h2>Emergency Services</h2>
          <ul>
            <li><strong>Police:</strong> 119</li>
            <li><strong>Ambulance / Fire:</strong> 110</li>
            <li><strong>Disaster Management Center:</strong> 117</li>
            <li><strong>Tourist Police (Colombo):</strong> +94 11 2421052</li>
            <li><strong>National Hospital (Colombo):</strong> +94 11 2691111</li>
          </ul>
        </div>

        <div className="location-section">
          <h2>Key Locations</h2>
          <ul>
            <li><strong>Colombo Central Police Station:</strong> No. 121, Dam Street, Colombo 12</li>
            <li><strong>Bandaranaike International Airport Emergency:</strong> +94 11 2252861</li>
            <li><strong>US Embassy in Sri Lanka:</strong> +94 11 2498500</li>
            <li><strong>British High Commission Colombo:</strong> +94 11 5390639</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default SecurityContact;
