import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { navigationData } from '../data/navigation';
import useScrollPosition from '../hooks/useScrollPosition';
import './Navbar.css';

export default function Navbar() {
  const scrolled = useScrollPosition(50);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleDropdown = (label) => setActiveDropdown(activeDropdown === label ? null : label);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-container">
          <NavLink to="/" className="navbar-logo">
            <img src="/logo.webp" alt="Sounds Perfect Logo" className="logo-image" width="175" height="54" loading="lazy" />
          </NavLink>
          
          <div className="navbar-links desktop-only">
            {navigationData.map((item) => (
              item.type === 'dropdown' ? (
                <div className="nav-item-dropdown" key={item.title}>
                  <NavLink to={item.to} className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                    {item.title} <ChevronDown size={16} />
                  </NavLink>
                  <div className="dropdown-menu">
                    {item.children.map(child => {
                      const Icon = child.icon;
                      return (
                        <Link key={child.to} to={child.to} className="dropdown-item">
                          {Icon && <Icon size={16} className="dropdown-icon" />}
                          {child.title}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <NavLink key={item.to} to={item.to} className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                  {item.title}
                </NavLink>
              )
            ))}
          </div>

          <button className="mobile-menu-btn mobile-only" onClick={toggleMobileMenu} aria-label="Toggle menu">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        {navigationData.map((item) => (
          item.type === 'dropdown' ? (
            <div className="mobile-dropdown" key={item.title}>
              <button className="mobile-nav-link flex justify-between items-center w-full" onClick={() => toggleDropdown(item.title)}>
                {item.title} <ChevronDown size={20} className={`chevron-icon ${activeDropdown === item.title ? 'rotated' : ''}`} />
              </button>
              <div className={`mobile-dropdown-content ${activeDropdown === item.title ? 'open' : ''}`}>
                <Link to={item.to} className="mobile-sub-link font-semibold" onClick={() => setMobileMenuOpen(false)}>Overzicht {item.title}</Link>
                {item.children.map(child => (
                  <Link key={child.to} to={child.to} className="mobile-sub-link" onClick={() => setMobileMenuOpen(false)}>
                    {child.title}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <NavLink key={item.to} to={item.to} className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>{item.title}</NavLink>
          )
        ))}
      </div>
    </>
  );
}
