import React, { useState, useCallback } from 'react';
import SearchBox from '../services/blogs/components/SearchBox.jsx';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setMenuOpen(prevMenuOpen => !prevMenuOpen);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  return (
    <header>
      <div className="header-content">
        <h1 className="site-title">Kのファッション部屋</h1>
        <button className="hamburger-menu" onClick={toggleMenu}>
          {menuOpen ? '✖' : '☰'}
        </button>
      </div>
      <nav className={`slide-menu ${menuOpen ? 'open' : ''}`}>
        <SearchBox className="search-box" closeMenu={closeMenu} />
      </nav>
    </header>
  );
};

export default Header;
