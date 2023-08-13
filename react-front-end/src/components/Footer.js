import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [activeModal, setActiveModal] = useState(null);

  const showModal = (modalName) => {
    setActiveModal(modalName);
  };

  const hideModal = () => {
    setActiveModal(null);
  };

  const styles = {
    footer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f8f8f8',
      padding: '20px',
      borderTop: '1px solid #e7e7e7',
      bottom: '0',
      marginTop: '20px',
    },
    link: {
      margin: '0 10px',
      textDecoration: 'none',
      color: 'black',
      fontWeight: 'normal',
      borderRadius: '5px',
      padding: '5px 10px',
      fontSize: '20px',
    },
    modal: {
      position: 'fixed',
      bottom: activeModal ? '73px' : '-500px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'white',
      padding: '20px',
      opacity: activeModal ? 1 : 0, 
      visibility: activeModal ? 'visible' : 'hidden', 
      transition: 'all 0.3s ease-out', 
      maxHeight: '50%',
      overflow: 'auto',
      zIndex: 1000,
      borderRadius: '10px',
    },
    backdrop: {
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      //background: 'rgba(0,0,0,0.5)',
      display: activeModal ? 'block' : 'none',
      zIndex: '999',
    },
    text: {
      color: 'black',
    },
    linkText: {
      color: 'black',
      textDecoration: 'none',
      fontWeight: 'bold',
    },
  };

  return (
    <div>
      <div style={styles.footer}>
        <Link to="#" style={styles.link} onClick={() => showModal('contact')}>Contact Us</Link>
        <Link to="#" style={styles.link} onClick={() => showModal('privacy')}>Privacy Policy</Link>
        <Link to="#" style={styles.link} onClick={() => showModal('terms')}>Terms of Service</Link>
      </div>
      <div style={styles.backdrop} onClick={hideModal}></div>
      <div style={styles.modal}>
        {activeModal === 'contact' && (
          <div style={styles.text}>
            <h2>Contact Us</h2>
            <h3>Vist our GitHubs</h3>
            <p>GitHub: <a href="https://github.com/lukechamberland" target="_blank" rel="noopener noreferrer" style={styles.linkText}>Luke</a></p>
            <p>GitHub: <a href="https://github.com/sharleenb" target="_blank" rel="noopener noreferrer" style={styles.linkText}>Sharleen</a></p>
            <p>GitHub: <a href="https://github.com/OscarMankiewicz" target="_blank" rel="noopener noreferrer" style={styles.linkText}>Oscar</a></p>
          </div>
        )}
        {activeModal === 'privacy' && <div>Privacy Policy...</div>}
        {activeModal === 'terms' && (
          <div style={styles.text}>
            <h2><strong>TERMS OF SERVICE</strong></h2>
            <h3><strong>1. ACCEPTANCE OF TERMS</strong></h3>
            <p>By accessing or using the services provided by [TimelessTrends] (“We,” “Us,” or “Our”), you agree to comply with and be bound by these Terms of Service. If you do not agree to all the terms and conditions contained herein, do not use or access the services.</p>
            <h3><strong>2. CHANGES TO TERMS</strong></h3>
            <p>We reserve the right to update or modify these Terms of Service at any time without prior notice. Your continued use of the services after any changes constitutes your acceptance of the new Terms of Service.</p>
            <h3><strong>3. REGISTRATION AND ACCOUNT SECURITY</strong></h3>
            <p>You may be required to register to use certain services. You agree to provide accurate and current information and to keep this information up-to-date.</p>
            <h3><strong>4. USE OF SERVICES</strong></h3>
            <p>You agree to use the services only for purposes that are legal, ethical, and in accordance with these Terms of Service and any applicable laws or regulations.</p>
            <h3><strong>5. CONTENT AND CONDUCT</strong></h3>
            <p>You are solely responsible for the content you upload, post, or otherwise transmit using the services. You agree not to use the services to post or transmit any material that is unlawful, harmful, threatening, abusive, or otherwise objectionable.</p>
            <h3><strong>6. TERMINATION</strong></h3>
            <p>We reserve the right to terminate or suspend your access to the services at any time, without notice, for conduct that we believe violates these Terms of Service or is harmful to us, other users of the services, or third parties, or for any other reason.</p>
            <h3><strong>7. DISCLAIMER OF WARRANTIES</strong></h3>
            <p>The services are provided “as is” and “as available” without any warranties of any kind, either express or implied, including, but not limited to, the implied warranties of merchantability, fitness for a particular purpose, or non-infringement.</p>
            <h3><strong>8. LIMITATION OF LIABILITY</strong></h3>
            <p>In no event shall [TimelessTrends] be liable for any indirect, incidental, special, consequential, or exemplary damages, including but not limited to, damages for loss of profits, goodwill, use, data, or other intangible losses, arising out of or in connection with the services.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Footer;