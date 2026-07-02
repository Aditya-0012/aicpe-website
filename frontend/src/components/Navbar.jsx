import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Mail, Phone } from 'lucide-react';
import './Navbar.css';

const NAV = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  {
    label: 'Registration',
    path: '/registration',
    children: [
      { label: 'Member Registration', path: '/registration' },
      { label: 'Associate Member', path: '/registration/associate' },
      { label: 'Institutional Member', path: '/registration/institutional' },
      { label: 'Life Member', path: '/registration/life' },
      { label: 'Regular Member', path: '/registration/regular' },
    ],
  },
  { label: 'Events', path: '/events' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact Us', path: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setOpen(false);
    setOpenDropdown(null);
  }, [location]);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className={`navbar-wrap ${scrolled ? 'scrolled' : ''}`}>
      {/* Top bar */}
      <div className="topbar">
        <div className="container topbar-inner">
          <a href="mailto:cp@aicpe.ac.in" className="topbar-item">
            <Mail size={13} /> cp@aicpe.ac.in
          </a>
          <a href="tel:+919425006602" className="topbar-item">
            <Phone size={13} /> +91-9425006602
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav className="navbar container" ref={dropdownRef}>
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <div className="logo-icon">
            <span>AICPE</span>
          </div>
          <div className="logo-text">
            <span className="logo-full">All India Council of</span>
            <span className="logo-bold">Physical Education</span>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="nav-links">
          {NAV.map((item) => (
            <li key={item.path} className="nav-item">
              {item.children ? (
                <>
                  <button
                    className={`nav-link nav-link-btn ${location.pathname.startsWith(item.path) ? 'active' : ''}`}
                    onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                  >
                    {item.label}
                    <ChevronDown size={14} className={`chevron ${openDropdown === item.label ? 'open' : ''}`} />
                  </button>
                  {openDropdown === item.label && (
                    <ul className="dropdown">
                      {item.children.map((child) => (
                        <li key={child.path}>
                          <Link
                            to={child.path}
                            className={`dropdown-item ${location.pathname === child.path ? 'active' : ''}`}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link to="/registration" className="nav-cta btn btn-primary">
          Join AICPE
        </Link>

        {/* Hamburger */}
        <button className="hamburger" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        <ul>
          {NAV.map((item) => (
            <li key={item.path}>
              {item.children ? (
                <>
                  <button
                    className="mobile-link mobile-parent"
                    onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                  >
                    {item.label}
                    <ChevronDown size={14} className={openDropdown === item.label ? 'open' : ''} />
                  </button>
                  {openDropdown === item.label && (
                    <ul className="mobile-dropdown">
                      {item.children.map((child) => (
                        <li key={child.path}>
                          <Link to={child.path} className="mobile-link mobile-child">
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link to={item.path} className={`mobile-link ${location.pathname === item.path ? 'active' : ''}`}>
                  {item.label}
                </Link>
              )}
            </li>
          ))}
          <li>
            <Link to="/registration" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
              Join AICPE
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
