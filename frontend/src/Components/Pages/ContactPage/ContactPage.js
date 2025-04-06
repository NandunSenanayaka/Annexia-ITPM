// import React from 'react';
// import './ContactPage.css';
// import Navbar from '../HomePage/Navbar'; 
// import HeroImage from '../../../Assets/Hero.png'; 

// const ContactPage = () => {
//   return (
//     <div className="contact-page">
//       <Navbar />

//       {/* Hero Section */}
//       <div className="hero-section">
//         <img src={HeroImage} alt="Hero" className="hero-image" />
//         <h1 className="hero-text">CONTACT</h1>
//       </div>

//       {/* Contact Info */}
//       <div className="contact-info">
//         <div className="info-card">
//           <div className="info-icon">📧</div>
//           <h3>EMAIL</h3>
//           <p>ANNEXIA@GMAIL.COM</p>
//         </div>
//         <div className="info-card">
//           <div className="info-icon">📞</div>
//           <h3>PHONE NO</h3>
//           <p>+94 222 2745</p>
//         </div>
//         <div className="info-card">
//           <div className="info-icon">📍</div>
//           <h3>ADDRESS</h3>
//           <p>257/A, COLOMBO 7, PILIYANDALA</p>
//         </div>
//       </div>

//       {/* Message Section */}
//       <section className="message-section">
//         <h2>LET’S MAKE SOMETHING NEW TOGETHER</h2>
//         <p>
//             Contact us to list your annex for rent and connect with potential tenants easily. Let's make renting simple and hassle-free!
//         </p>
//         <div className="message-content">
//             <div className="map-container">
//             <iframe
//                 title="Sri Lanka Location Map"
//                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1062445.0851256144!2d79.67576649284847!3d7.8731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2592e95fe0d5b%3A0x680e975bceff4e79!2sSri%20Lanka!5e0!3m2!1sen!2s!4v1681685078954!5m2!1sen!2s"
//                 width="100%"
//                 height="400"
//                 loading="lazy"
//                 referrerPolicy="no-referrer-when-downgrade"
//             ></iframe>
//             </div>
//             <form className="contact-form">
//             <div className="form-row">
//                 <input type="text" placeholder="Your name" className="input-half" />
//                 <input type="text" placeholder="Subject" className="input-half" />
//             </div>
//             <input type="email" placeholder="Email Address" className="input-full" />
//             <textarea placeholder="Message" rows="6" className="input-full"></textarea>
//             <button type="submit" className="submit-button">SUBMIT</button>
//             </form>
//         </div>
//         </section>



//       {/* Footer */}
//       <footer className="footer">
//         <div className="footer-content">
//           <div className="footer-section">
//             <h3>ANNEXIA</h3>
//             <p>
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
//             </p>
//             <div className="social-icons">
//               <i className="fab fa-facebook-f"></i>
//               <i className="fab fa-instagram"></i>
//               <i className="fab fa-pinterest-p"></i>
//             </div>
//           </div>
//           <div className="footer-section">
//             <h4>NAVIGATION</h4>
//             <ul>
//               <li>Home</li>
//               <li>About</li>
//               <li>Contact</li>
//             </ul>
//           </div>
//           <div className="footer-section">
//             <h4>SALES SUPPORT</h4>
//             <p>+(62)21 2002–2012</p>
//             <h4>EMAIL BUSINESS</h4>
//             <p>Annexia@.Com</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default ContactPage;

import React, { useEffect, useState } from 'react';
import './ContactPage.css';
import Navbar from '../HomePage/Navbar'; 
import HeroImage from '../../../Assets/Hero.png'; 

const ContactPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set visibility to true after the component is mounted to trigger the animation
    setIsVisible(true);
  }, []);

  return (
    <div className={`contact-page ${isVisible ? 'fade-in' : ''}`}>
      <Navbar />

      {/* Hero Section */}
      <div className={`hero-section ${isVisible ? 'fade-in' : ''}`}>
        <img src={HeroImage} alt="Hero" className="hero-image" />
        <h1 className="hero-text">CONTACT</h1>
      </div>

      {/* Contact Info */}
      <div className={`contact-info ${isVisible ? 'fade-in' : ''}`}>
        <div className="info-card">
          <div className="info-icon">📧</div>
          <h3>EMAIL</h3>
          <p>ANNEXIA@GMAIL.COM</p>
        </div>
        <div className="info-card">
          <div className="info-icon">📞</div>
          <h3>PHONE NO</h3>
          <p>+94 222 2745</p>
        </div>
        <div className="info-card">
          <div className="info-icon">📍</div>
          <h3>ADDRESS</h3>
          <p>257/A, COLOMBO 7, PILIYANDALA</p>
        </div>
      </div>

      {/* Message Section */}
      <section className={`message-section ${isVisible ? 'fade-in' : ''}`}>
        <h2>LET’S MAKE SOMETHING NEW TOGETHER</h2>
        <p>
          Contact us to list your annex for rent and connect with potential tenants easily. Let's make renting simple and hassle-free!
        </p>
        <div className="message-content">
          <div className="map-container">
            <iframe
              title="Sri Lanka Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1062445.0851256144!2d79.67576649284847!3d7.8731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2592e95fe0d5b%3A0x680e975bceff4e79!2sSri%20Lanka!5e0!3m2!1sen!2s!4v1681685078954!5m2!1sen!2s"
              width="100%"
              height="400"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <form className="contact-form">
            <div className="form-row">
              <input type="text" placeholder="Your name" className="input-half" />
              <input type="text" placeholder="Subject" className="input-half" />
            </div>
            <input type="email" placeholder="Email Address" className="input-full" />
            <textarea placeholder="Message" rows="6" className="input-full"></textarea>
            <button type="submit" className="submit-button">SUBMIT</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className={`footer ${isVisible ? 'fade-in' : ''}`}>
        <div className="footer-content">
          <div className="footer-section">
            <h3>ANNEXIA</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="social-icons">
              <i className="fab fa-facebook-f"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-pinterest-p"></i>
            </div>
          </div>
          <div className="footer-section">
            <h4>NAVIGATION</h4>
            <ul>
              <li>Home</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>SALES SUPPORT</h4>
            <p>+(62)21 2002–2012</p>
            <h4>EMAIL BUSINESS</h4>
            <p>Annexia@.Com</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;
