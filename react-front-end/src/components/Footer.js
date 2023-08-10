import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const styles = {
    footer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f8f8f8',
      padding: '20px',
      borderTop: '1px solid #e7e7e7',
      bottom: '0'
    },
    link: {
      margin: '0 10px',
      textDecoration: 'none',
      color: 'black'
    }
  };

  return (
    <div style={styles.footer}>
      <Link to="/contact" style={styles.link}>Contact Us</Link>
      <Link to="/privacy" style={styles.link}>Privacy Policy</Link>
      <Link to="/terms" style={styles.link}>Terms of Service</Link>
    </div>
  );
};

export default Footer;