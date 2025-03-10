// import React from 'react';
// import './HomePage.css';
// import coverImage from "../../../Assets/coverimage.jpg";
// import Chatbox from '../Chatbox/Chatbox';

// const HomePage = () => {
//   return (
//     <div>
//       {/* Navigation Bar */}
//       <nav className="navbar">
//         <div className="logo">ANNEXIA</div>
//         <ul className="nav-links">
//           <li className='no'><a href="#home">Home</a></li>
//           <li><a href="#about">About</a></li>
//           <li><a href="#contact">Contact</a></li>
//         </ul>
//         <button className="login-btn">Log In</button>
//       </nav>

//       {/* Cover Section */}
//       <section className="cover-section" style={{ backgroundImage: `url(${coverImage})` }}>
//         <div className="overlay">
//           <h2>Transforming The Future Of Home Living</h2>
//           <h1>ANNEXIA</h1>
//           <button className="cta-btn">Get Started</button>
//         </div>
//       </section>

//       {/* Our House Section */}
//       <section className="our-house">
//         <h2>OUR HOUSE</h2>
//         <p>BEST PROPERTIES</p>
//         <div className="house-list">
//           {/* Example House Card */}
//           <div className="house-card">
//           <img src={coverImage} alt="" />
//             <p>Luxury House for Sale in Peradeniya</p>
//           </div>
//           <div className="house-card">
//           <img src={coverImage} alt="" />
//             <p>3 Story House for Sale in Dangedara 10</p>
//           </div>
//           <div className="house-card">
//           <img src={coverImage} alt="" />
//             <p>Luxury Brand New 2 Story Houses in Matara</p>
//           </div>
//           <div className="house-card">
//           <img src={coverImage} alt="" />
//             <p>Brand New 3 Storied House for Sale in Ella</p>
//           </div>
//         </div>
//       </section>

//       {/* Footer Section */}
//       <footer className="footer">
//         <div className="footer-content">
//           <p>&copy; 2025 ANNEXIA. All rights reserved.</p>
//           <p>Email: Annexia@.com | Contact: (+62) 21 2002-2012</p>
//         </div>
//       </footer>
//       <Chatbox />
//     </div>
//   );
// };

// export default HomePage;




import React from 'react';
import coverImage from "../../../Assets/coverimage.jpg";
import Chatbox from '../Chatbox/Chatbox';

const HomePage = () => {
  // Define all styles as JavaScript objects
  const styles = {
    root: {
      fontFamily: 'Inter, sans-serif',
      color: '#212121',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
    },
    header: {
      backgroundColor: 'white',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      borderRadius: '16px',
      margin: '20px auto',
      padding: '0px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    logo: {
      fontWeight: 700,
      fontSize: '1.5rem',
      color: '#2E7D32',
    },
    nav: {
      display: 'flex',
    },
    navUl: {
      display: 'flex',
      listStyle: 'none',
      gap: '30px',
    },
    navLink: {
      textDecoration: 'none',
      color: '#212121',
      fontWeight: 500,
      transition: 'color 0.3s',
    },
    ctaButtons: {
      display: 'flex',
      gap: '15px',
    },
    btn: {
      padding: '10px 20px',
      borderRadius: '50px',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'all 0.3s',
      border: 'none',
    },
    btnOutline: {
      border: '1px solid #2E7D32',
      background: 'transparent',
      color: '#2E7D32',
    },
    btnPrimary: {
      background: '#2E7D32',
      color: 'white',
    },
    hero: {
      // background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${coverImage})`,
      background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '500px',
      borderRadius: '20px',
      margin: '30px auto',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
    },
    heroContent: {
      color: 'white',
      padding: '0 50px',
      maxWidth: '600px',
    },
    heroSubtitle: {
      fontSize: '1rem',
      marginBottom: '10px',
    },
    heroTitle: {
      fontSize: '3.5rem',
      fontWeight: 700,
      marginBottom: '20px',
      lineHeight: 1.1,
    },
    heroTitleSpan: {
      color: '#81C784',
    },
    heroDescription: {
      marginBottom: '30px',
      fontSize: '1.1rem',
    },
    heroButtons: {
      display: 'flex',
      gap: '15px',
    },
    sectionTitle: {
      textAlign: 'center',
      margin: '50px 0 30px',
      fontSize: '2rem',
      color: '#1B5E20',
    },
    cards: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '30px',
      marginBottom: '50px',
    },
    card: {
      background: '#F5F5F5',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s, box-shadow 0.3s',
    },
    cardImg: {
      height: '200px',
      width: '100%',
      objectFit: 'cover',
    },
    cardContent: {
      padding: '20px',
    },
    cardTitle: {
      fontSize: '1.25rem',
      marginBottom: '10px',
      color: '#1B5E20',
    },
    cardText: {
      color: '#757575',
      marginBottom: '15px',
      lineHeight: 1.5,
    },
    footer: {
      backgroundColor: '#1B5E20',
      color: 'white',
      padding: '50px 0 20px',
      marginTop: '50px',
    },
    footerContent: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '30px',
      marginBottom: '30px',
    },
    footerColumn: {
      marginBottom: '20px',
    },
    footerColumnH3: {
      fontSize: '1.2rem',
      marginBottom: '20px',
    },
    footerColumnUl: {
      listStyle: 'none',
    },
    footerColumnLi: {
      marginBottom: '10px',
    },
    footerColumnA: {
      color: '#B9B9B9',
      textDecoration: 'none',
      transition: 'color 0.3s',
    },
    footerBottom: {
      textAlign: 'center',
      paddingTop: '20px',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    },
    // Media query styles are handled with conditional rendering
  };

  // Function to handle hover effects
  const handleCardHover = (e, isHovering) => {
    if (isHovering) {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
    } else {
      e.currentTarget.style.transform = 'none';
      e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
    }
  };

  // Responsive styles based on window width
  const isMobile = window.innerWidth <= 768;
  const isSmallMobile = window.innerWidth <= 576;

  // Apply responsive styles
  if (isMobile) {
    styles.header = {
      ...styles.header,
      flexDirection: 'column',
      gap: '15px',
      padding: '15px',
    };
    styles.navUl = {
      ...styles.navUl,
      gap: '15px',
    };
    styles.hero = {
      ...styles.hero,
      height: '400px',
    };
    styles.heroTitle = {
      ...styles.heroTitle,
      fontSize: '2.5rem',
    };
    styles.heroContent = {
      ...styles.heroContent,
      padding: '0 20px',
    };
  }

  if (isSmallMobile) {
    styles.ctaButtons = {
      ...styles.ctaButtons,
      flexDirection: 'column',
      width: '100%',
    };
    styles.btn = {
      ...styles.btn,
      width: '100%',
      textAlign: 'center',
    };
    styles.heroButtons = {
      ...styles.heroButtons,
      flexDirection: 'column',
    };
    styles.heroTitle = {
      ...styles.heroTitle,
      fontSize: '2rem',
    };
  }

  return (
    <div style={styles.root}>
      {/* Header & Navigation */}
      <div style={styles.container}>
        <header style={styles.header}>
          <div style={styles.logo}>ANNEXIA</div>
          <nav style={styles.nav}>
            <ul style={styles.navUl}>
              <li><a href="#" style={styles.navLink}>Home</a></li>
              <li><a href="#" style={styles.navLink}>About</a></li>
              <li><a href="#" style={styles.navLink}>Contact Us</a></li>
            </ul>
          </nav>
          <div style={styles.ctaButtons}>
            <button style={{...styles.btn, ...styles.btnOutline}}>View our pricing</button>
            <button style={{...styles.btn, ...styles.btnPrimary}}>Book a call</button>
          </div>
        </header>
        
        {/* Hero Section */}
        <section style={styles.hero}>
          <div style={styles.heroContent}>
            {/* <p style={styles.heroSubtitle}>Modern Annex</p> */}
            <h1 style={styles.heroTitle}>
              TRANSFORMING<span style={styles.heroTitleSpan}>THE FUTURE OF</span> HOME LIVING
            </h1>
            <p style={styles.heroDescription}>
              Start Your Jouney Toward Homeownership Today!
            </p>
            <div style={styles.heroButtons}>
              <button style={{...styles.btn, ...styles.btnPrimary}}>Get Started</button>
              <button style={{...styles.btn, ...styles.btnOutline, color: 'white'}}>Learn More</button>
            </div>
          </div>
        </section>
        
        {/* Card Section */}
        <h2 style={styles.sectionTitle}>Our Services</h2>
        <div style={styles.cards}>
          <div 
            style={styles.card} 
            onMouseEnter={(e) => handleCardHover(e, true)}
            onMouseLeave={(e) => handleCardHover(e, false)}
          >
            <img 
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
              alt="Web Development" 
              style={styles.cardImg} 
            />
            <div style={styles.cardContent}>
              <h3 style={styles.cardTitle}>Web Development</h3>
              <p style={styles.cardText}>
                Custom web applications built with the latest technologies to meet your business needs.
              </p>
              <button style={{...styles.btn, ...styles.btnOutline}}>Learn More</button>
            </div>
          </div>
          
          <div 
            style={styles.card}
            onMouseEnter={(e) => handleCardHover(e, true)}
            onMouseLeave={(e) => handleCardHover(e, false)}
          >
            <img 
              src="https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" 
              alt="Mobile Apps" 
              style={styles.cardImg} 
            />
            <div style={styles.cardContent}>
              <h3 style={styles.cardTitle}>Mobile Apps</h3>
              <p style={styles.cardText}>
                Cross-platform mobile applications that work seamlessly on iOS and Android devices.
              </p>
              <button style={{...styles.btn, ...styles.btnOutline}}>Learn More</button>
            </div>
          </div>
          
          <div 
            style={styles.card}
            onMouseEnter={(e) => handleCardHover(e, true)}
            onMouseLeave={(e) => handleCardHover(e, false)}
          >
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1415&q=80" 
              alt="E-commerce" 
              style={styles.cardImg} 
            />
            <div style={styles.cardContent}>
              <h3 style={styles.cardTitle}>E-commerce</h3>
              <p style={styles.cardText}>
                Powerful online stores with secure payment processing and inventory management.
              </p>
              <button style={{...styles.btn, ...styles.btnOutline}}>Learn More</button>
            </div>
          </div>
          
          <div 
            style={styles.card}
            onMouseEnter={(e) => handleCardHover(e, true)}
            onMouseLeave={(e) => handleCardHover(e, false)}
          >
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
              alt="UI/UX Design" 
              style={styles.cardImg} 
            />
            <div style={styles.cardContent}>
              <h3 style={styles.cardTitle}>UI/UX Design</h3>
              <p style={styles.cardText}>
                Beautiful, intuitive interfaces that enhance user experience and drive engagement.
              </p>
              <button style={{...styles.btn, ...styles.btnOutline}}>Learn More</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.container}>
          <div style={styles.footerContent}>
            <div style={styles.footerColumn}>
              <h3 style={styles.footerColumnH3}>ANNEXIA</h3>
              <p>Building modern web applications with the MERN stack. We help businesses transform their ideas into reality.</p>
            </div>
            
            <div style={styles.footerColumn}>
              <h3 style={styles.footerColumnH3}>Quick Links</h3>
              <ul style={styles.footerColumnUl}>
                <li style={styles.footerColumnLi}><a href="#" style={styles.footerColumnA}>Home</a></li>
                <li style={styles.footerColumnLi}><a href="#" style={styles.footerColumnA}>About</a></li>
                <li style={styles.footerColumnLi}><a href="#" style={styles.footerColumnA}>Services</a></li>
                <li style={styles.footerColumnLi}><a href="#" style={styles.footerColumnA}>Portfolio</a></li>
                <li style={styles.footerColumnLi}><a href="#" style={styles.footerColumnA}>Contact Us</a></li>
              </ul>
            </div>
            
            <div style={styles.footerColumn}>
              <h3 style={styles.footerColumnH3}>Services</h3>
              <ul style={styles.footerColumnUl}>
                <li style={styles.footerColumnLi}><a href="#" style={styles.footerColumnA}>Web Development</a></li>
                <li style={styles.footerColumnLi}><a href="#" style={styles.footerColumnA}>Mobile Apps</a></li>
                <li style={styles.footerColumnLi}><a href="#" style={styles.footerColumnA}>E-commerce</a></li>
                <li style={styles.footerColumnLi}><a href="#" style={styles.footerColumnA}>UI/UX Design</a></li>
                <li style={styles.footerColumnLi}><a href="#" style={styles.footerColumnA}>Consulting</a></li>
              </ul>
            </div>
            
            <div style={styles.footerColumn}>
              <h3 style={styles.footerColumnH3}>Contact Us</h3>
              <ul style={styles.footerColumnUl}>
                <li style={styles.footerColumnLi}>123 Tech Street, Silicon Valley</li>
                <li style={styles.footerColumnLi}>contact@greenmern.com</li>
                <li style={styles.footerColumnLi}>+1 (555) 123-4567</li>
              </ul>
            </div>
          </div>
          
          <div style={styles.footerBottom}>
            <p>&copy; {new Date().getFullYear()} GreenMERN. All rights reserved.</p>
          </div>
        </div>
      </footer>
      <Chatbox />
    </div>
  );
};

export default HomePage;