import React from 'react';
import './AboutUs.css';
import Navbar from '../HomePage/Navbar';
import Chatbox from '../Chatbox/Chatbox';
import hero from '../../../Assets/Hero.png';
import HeroImage from '../../../Assets/Hero IMG.png';
import agent1 from '../../../Assets/agent4.jpg';
import agent2 from '../../../Assets/agent3.jpg';
import agent3 from '../../../Assets/agent1.jpg';
import agent4 from '../../../Assets/agent2.jpg';
import user1 from '../../../Assets/agent1.jpg';
import user2 from '../../../Assets/agent4.jpg';

function AboutUs() {
  return (
    <div className="aboutus-container">
      <Navbar />

      {/* Contact Hero Section */}
      <div className="aboutus-contact-hero">
        <img src={HeroImage} alt="Hero" className="aboutus-contact-hero-image" />
      </div>

      {/* Vision and Mission Section */}
      <section className="aboutus-vision-hero">
        <div className="aboutus-vision-text">
          <h1>Our <span>Vision</span> & Mission</h1>
          <div className="aboutus-vision-mission">
            <div className="aboutus-vision-block">
              <h4>Vision</h4>
              <p>To revolutionize real estate by connecting people with their perfect spaces effortlessly and transparently.</p>
            </div>
            <div className="aboutus-mission-block">
              <h4>Mission</h4>
              <p>To deliver reliable, accessible, and innovative solutions for property buying, selling, and renting with integrity and dedication.</p>
            </div>
          </div>
        </div>
        <div className="aboutus-vision-image">
          {/* <img src={agent1} alt="Vision" /> */}
        </div>
      </section>

      {/* Agents Section */}
      <section className="aboutus-agents-section">
        <h2 className="aboutus-section-title">MEET OUR AGENTS</h2>
        <div className="aboutus-agents-wrapper">
          {[ 
            { name: "Ruchira Bandara", role: "Owner", img: agent1 },
            { name: "Sahan Udara", role: "Service Supporter", img: agent2 },
            { name: "Nadun Harsha", role: "Agency", img: agent3 },
            { name: "Apsara Madushani", role: "Sales", img: agent4 }
          ].map((agent, i) => (
            <div className="aboutus-agent-card" key={i}>
              <img src={agent.img} alt={agent.name} />
              <h4>{agent.name}</h4>
              <p>{agent.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="aboutus-testimonial-section">
        <h2 className="aboutus-section-title">TESTIMONIAL</h2>
        <p className="aboutus-subheading">WHAT CUSTOMERS ARE SAYING.</p>
        <div className="aboutus-testimonials-wrapper">
          <div className="aboutus-testimonial-card">
            <div className="aboutus-user-info">
              <img src={user1} alt="John Smith" />
              <div>
                <h4>John Smith</h4>
                <p>CEO, Tech Innovations Inc.</p>
                <span className="aboutus-stars">★★★★★</span>
              </div>
            </div>
            <p>"Working with this real estate company was a fantastic experience. They helped us find our dream home quickly and made the process smooth and stress-free. Highly recommend!"</p>
          </div>
          <div className="aboutus-testimonial-card">
            <div className="aboutus-user-info">
              <img src={user2} alt="Richard Lee" />
              <div>
                <h4>Richard Lee</h4>
                <p>Project Manager, Global Enterprises</p>
                <span className="aboutus-stars">★★★★★</span>
              </div>
            </div>
            <p>"We couldn't be happier with the service we received. Their expertise and dedication were evident from the start, and they found us the perfect property that met all our needs."</p>
          </div>
        </div>
      </section>

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
      <Chatbox />
    </div>
  );
}

export default AboutUs;
