import React, { useState } from 'react';
import Header from './Header';
import ToggleNav from './ToggleNav';
import logo from '../images/logo.png';

const Layout = ({ children }) => {
  const [isNavOpen, setNavOpen] = useState(false);
  const handleMenuClick = () => {
    setNavOpen(!isNavOpen);
  };

  return (
    <div>
      <Header
        title="TimelessTrends"
        logo={logo}
        toggleDrawer={handleMenuClick}
      />
      <ToggleNav isOpen={isNavOpen} toggleDrawer={setNavOpen} />
      {children}
    </div>
  );
};

export default Layout;
