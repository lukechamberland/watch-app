import React from 'react';
import cartIcon from '../images/cart.png';
import profileIcon from '../images/profile.png';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

const Header = (props) => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const userLogout = () => {
    window.sessionStorage.removeItem("userId");
    logout();
  };

  const handleLinkClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      loginWithRedirect();
    }
  };

  return (
    <header style={styles.header}>
      <div style={styles.left}>
        <button style={styles.menuButton} onClick={props.toggleDrawer}>
          <div style={styles.bar}></div>
          <div style={styles.bar}></div>
          <div style={styles.bar}></div>
        </button>
      </div>
      <div style={styles.center}>
        <img src={props.logo} alt="Logo" style={styles.logo} />
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h1 style={styles.title}>{props.title}</h1>
        </Link>
      </div>
      <div style={styles.right}>
        <Link to="/cart" style={styles.cartButton} onClick={handleLinkClick}>
          <img src={cartIcon} alt="Cart" style={styles.icon} />
        </Link>
        <Link to="/profile" style={styles.profileButton} onClick={handleLinkClick}>
			    <img src={profileIcon} alt="Profile" style={styles.icon} />
        </Link>
        {isAuthenticated ? (
          <button style={styles.logoutButton} onClick={userLogout}>Logout</button>
        ) : (
          <button style={styles.loginButton} onClick={() => loginWithRedirect()}>Login</button>
        )}
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#f0f0f0',
  },
  left: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  center: {
    flex: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '10px',
  },
  menuButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
  bar: {
    height: '3px',
    width: '20px',
    background: '#333',
    margin: '2px 0',
    display: 'block'
  },
  logo: {
    height: '40px',
    marginRight: '10px'
  },
  title: {
    margin: 0
  },
  cartButton: {
    marginRight: '10px',
    cursor: 'pointer',
    background: 'transparent',
    border: 'none',
  },
  profileButton: {
    cursor: 'pointer',
    background: 'transparent',
    border: 'none',
    marginRight: '20px',
  },
  icon: {
    height: '20px',
    width: '20px',
  },
  loginButton: {
    cursor: 'pointer',
    background: 'transparent',
    border: 'none',
  },
  logoutButton: {
    cursor: 'pointer',
    background: 'transparent',
    border: 'none',
  },
};

export default Header;
