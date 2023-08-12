import React, { useState } from 'react';
import Header from './Header';
import ToggleNav from './ToggleNav';
import logo from '../images/logo.png';
import Footer from './Footer';

const Layout = ({ children }) => {
  const [isNavOpen, setNavOpen] = useState(false);
  const handleMenuClick = () => {
    setNavOpen(!isNavOpen);
  };

  return (
    <div style={styles.grid}>
      <Header
        title="TimelessTrends"
        logo={logo}
        toggleDrawer={handleMenuClick}
      />
      <ToggleNav isOpen={isNavOpen} toggleDrawer={setNavOpen} />
      {children}
      <Footer />
    </div>
  );
};

const styles = {
  grid: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr auto',
    gridTemplateColumns: '100%',
    minHeight: '100vh',
  },
}

export default Layout;
