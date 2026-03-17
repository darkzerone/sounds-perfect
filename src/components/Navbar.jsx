import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { servicesData } from '../data/services';
import { eventsData } from '../data/events';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileVerhuurOpen, setMobileVerhuurOpen] = useState(false);
  const [mobileEvenementenOpen, setMobileEvenementenOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo">
          <img src="/logo.png" alt="Sounds Perfect Logo" className="logo-image" width="175" height="54" />
        </NavLink>
        
        <div className="navbar-links desktop-only">
          <NavLink to="/" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
            Startpagina
          </NavLink>
          
          <div className="nav-item-dropdown">
            <NavLink 
              to="/verhuur" 
              className={({isActive}) => isActive ? "nav-link active" : "nav-link"}
            >
              Verhuur <ChevronDown size={16} />
            </NavLink>
            <div className="dropdown-menu">
              {servicesData.map(service => {
                const Icon = service.icon;
                return (
                  <Link 
                    key={service.id} 
                    to={`/verhuur/dienst/${service.id}`} 
                    className="dropdown-item"
                  >
                    <Icon size={16} className="dropdown-icon" />
                    {service.title}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="nav-item-dropdown">
            <NavLink 
              to="/evenementen" 
              className={({isActive}) => isActive ? "nav-link active" : "nav-link"}
            >
              Evenementen <ChevronDown size={16} />
            </NavLink>
            <div className="dropdown-menu">
              {eventsData.map(event => {
                const Icon = event.icon;
                return (
                  <Link 
                    key={event.id} 
                    to={`/evenementen/type/${event.id}`} 
                    className="dropdown-item"
                  >
                    <Icon size={16} className="dropdown-icon" />
                    {event.title}
                  </Link>
                );
              })}
            </div>
          </div>

          <NavLink to="/contact" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
            Contact
          </NavLink>
        </div>

        <button 
          className="mobile-menu-btn mobile-only" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <NavLink to="/" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Startpagina</NavLink>
        
        <div className="mobile-dropdown">
          <button className="mobile-nav-link flex justify-between items-center w-full" onClick={() => setMobileVerhuurOpen(!mobileVerhuurOpen)}>
            Verhuur <ChevronDown size={20} className={`chevron-icon ${mobileVerhuurOpen ? 'rotated' : ''}`} />
          </button>
          <div className={`mobile-dropdown-content ${mobileVerhuurOpen ? 'open' : ''}`}>
            <Link to="/verhuur" className="mobile-sub-link font-semibold" onClick={() => setMobileMenuOpen(false)}>Overzicht Verhuur</Link>
            {servicesData.map(service => (
              <Link key={service.id} to={`/verhuur/dienst/${service.id}`} className="mobile-sub-link" onClick={() => setMobileMenuOpen(false)}>
                {service.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="mobile-dropdown">
          <button className="mobile-nav-link flex justify-between items-center w-full" onClick={() => setMobileEvenementenOpen(!mobileEvenementenOpen)}>
            Evenementen <ChevronDown size={20} className={`chevron-icon ${mobileEvenementenOpen ? 'rotated' : ''}`} />
          </button>
          <div className={`mobile-dropdown-content ${mobileEvenementenOpen ? 'open' : ''}`}>
            <Link to="/evenementen" className="mobile-sub-link font-semibold" onClick={() => setMobileMenuOpen(false)}>Overzicht Evenementen</Link>
            {eventsData.map(event => (
              <Link key={event.id} to={`/evenementen/type/${event.id}`} className="mobile-sub-link" onClick={() => setMobileMenuOpen(false)}>
                {event.title}
              </Link>
            ))}
          </div>
        </div>

        <NavLink to="/contact" className="mobile-nav-link border-b-0" onClick={() => setMobileMenuOpen(false)}>Contact</NavLink>
      </div>
    </>
  );
}
