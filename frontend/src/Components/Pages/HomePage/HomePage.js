import React from 'react';
import './HomePage.css';
import coverImage from "../../../Assets/coverimage.jpg";

const HomePage = () => {
  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">ANNEXIA</div>
        <ul className="nav-links">
          <li className='no'><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <button className="login-btn">Log In</button>
      </nav>

      {/* Cover Section */}
      <section className="cover-section" style={{ backgroundImage: `url(${coverImage})` }}>
        <div className="overlay">
          <h2>Transforming The Future Of Home Living</h2>
          <h1>ANNEXIA</h1>
          <button className="cta-btn">Get Started</button>
        </div>
      </section>

      {/* Our House Section */}
      <section className="our-house">
        <h2>OUR HOUSE</h2>
        <p>BEST PROPERTIES</p>
        <div className="house-list">
          {/* Example House Card */}
          <div className="house-card">
          <img src={coverImage} alt="" />
            <p>Luxury House for Sale in Peradeniya</p>
          </div>
          <div className="house-card">
          <img src={coverImage} alt="" />
            <p>3 Story House for Sale in Dangedara 10</p>
          </div>
          <div className="house-card">
          <img src={coverImage} alt="" />
            <p>Luxury Brand New 2 Story Houses in Matara</p>
          </div>
          <div className="house-card">
          <img src={coverImage} alt="" />
            <p>Brand New 3 Storied House for Sale in Ella</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2025 ANNEXIA. All rights reserved.</p>
          <p>Email: Annexia@.com | Contact: (+62) 21 2002-2012</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;