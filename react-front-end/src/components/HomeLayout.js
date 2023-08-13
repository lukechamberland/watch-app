import React, { useState } from 'react';
import HomeHeader from './HomeHeader';
import ToggleNav from './ToggleNav';
import logo from '../images/logo.png';
import Footer from './Footer';
import Slideshow from './Slideshow';

const HomeLayout = ({ children }) => {
  const [isNavOpen, setNavOpen] = useState(false);
  const handleMenuClick = () => {
    setNavOpen(!isNavOpen);
  };

  return (
    <div style={styles.grid}>
      <HomeHeader
        title="TimelessTrends"
        logo={logo}
        toggleDrawer={handleMenuClick}
      />
      <ToggleNav isOpen={isNavOpen} toggleDrawer={setNavOpen} />
      <Slideshow />
      {children}
      <Footer />
    </div>
  );
};

const styles = {
  grid: {
    position: 'relative',
    display: 'grid',
    gridTemplateRows: 'auto 1fr auto',
    gridTemplateColumns: '100%',
    minHeight: '100vh',
  },
}

export default HomeLayout;
