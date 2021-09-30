import React, { useEffect, useRef } from 'react';
import logo from './../../assets/image/netflix-logo.png';
import avatar from './../../assets/image/netflix-avatar.png';

const NavBar = (props) => {
  const navRef = useRef();
  const configHeader = () => {
    const navHeight = navRef.current.offsetHeight;
    props.headerRef.current.style.padding = `${
      2 * navHeight
    }px 0 ${navHeight}px`;
  };
  const handleScroll = () => {
    if (window.pageYOffset > 50) {
      navRef.current.classList.add('nav--scroll');
    } else {
      navRef.current.classList.remove('nav--scroll');
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div className="nav" ref={navRef} onLoad={configHeader}>
      <div className="nav__logo">
        <img src={logo} alt="" />
      </div>
      <div className="nav__avatar">
        <img src={avatar} alt="" />
      </div>
    </div>
  );
};

export default NavBar;
