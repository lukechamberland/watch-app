import React from 'react';

const Header = (props) => {
  return (
    <header style={styles.header}>
      <div style={styles.left}>
        <button style={styles.menuButton} onClick={props.onMenuClick}>
          <div style={styles.bar}></div>
          <div style={styles.bar}></div>
          <div style={styles.bar}></div>
        </button>
      </div>
      <div style={styles.center}>
        <img src={props.logo} alt="Logo" style={styles.logo} />
        <h1 style={styles.title}>{props.title}</h1>
      </div>
      <div style={styles.right}>
        <button style={styles.cartButton} onClick={props.onCartClick}>Cart</button>
        <button style={styles.profileButton} onClick={props.onProfileClick}>Profile</button>
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
  },
};

export default Header;
