import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Navbar from './Navbar';
import './HomePage.css';
import Chatbox from '../Chatbox/Chatbox';

// Import images (replace with your actual image paths)
import peradeniyaImage from '../../../Assets/peradeniyaImage.png';
import dangedaraimage from '../../../Assets/dangedaraImage.png';
import mataraImage from '../../../Assets/mataraImage.png';
import ellaImage from '../../../Assets/ellaImage.png';

const HomePage = () => {
  const { ref: servicesRef, inView: servicesInView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div className="home-page">
      <Navbar />
      <motion.header 
        className="App-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>ANNEXIA</motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }}>Start Your Journey Toward <br /> Homeownership Today!</motion.p>
        <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>Get Started</motion.button>
      </motion.header>

      {/* Our Services Section */}
      <motion.section 
        className="our-services"
        ref={servicesRef}
        initial={{ opacity: 0, y: 50 }}
        animate={servicesInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
      >
        <h2>OUR SERVICES</h2>
        <div className="services-list">
          {[peradeniyaImage, dangedaraimage, mataraImage, ellaImage].map((image, index) => (
            <motion.div 
              key={index} 
              className="service-item"
              initial={{ opacity: 0, y: 50 }}
              animate={servicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <img src={image} alt="Service" />
              <h3>Services</h3>
              <p>Southern Provinces</p>
            </motion.div>
          ))}
        </div>
      
      </motion.section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us">
        <h2>Why Choose Us?</h2>
        <div className="why-choose-us-content">
          <div className="why-choose-us-item">
            <h3>Exclusive Deals</h3>
            <ul>
              <li>Our top four terms (about 30 dollars only with US Treasury)</li>
              <li>We never even find ourselves less trusted holiday packages.</li>
            </ul>
          </div>
          <div className="why-choose-us-item">
            <h3>24/7 Support</h3>
            <p>Our current UEFA mandate issued one week to help you.</p>
          </div>
          <div className="why-choose-us-item">
            <h3>24/7 Support</h3>
            <p>Our current UEFA mandate issued one week to help you.</p>
          </div>
        </div>
      </section>
      
      <Chatbox />
      
      {/* Footer */}
      <footer className={`footer`}>
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

export default HomePage;
