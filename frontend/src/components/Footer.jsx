import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import './Footer.css';

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Registration', to: '/registration' },
  { label: 'Events', to: '/events' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact Us', to: '/contact' },
];

const relatedLinks = [
  { label: 'Sports Authority of India', href: 'https://www.sportsauthorityofindia.nic.in' },
  { label: 'NSNIS', href: '#' },
  { label: 'LNIPE', href: '#' },
  { label: 'FICCI', href: 'https://www.ficci.in' },
  { label: 'SPEFL-SC', href: '#' },
  { label: 'PMKVY', href: '#' },
];

const memberForms = [
  { label: 'Associate Member', to: '/registration/associate' },
  { label: 'Institutional Member', to: '/registration/institutional' },
  { label: 'Life Member', to: '/registration/life' },
  { label: 'Regular Member', to: '/registration/regular' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main container">
        <div className="footer-grid">
          {/* About */}
          <div className="footer-col footer-about">
            <div className="footer-logo">
              <div className="footer-logo-icon">AICPE</div>
              <div>
                <div className="footer-logo-text">All India Council of</div>
                <div className="footer-logo-bold">Physical Education</div>
              </div>
            </div>
            <p>
              Constituted by academically and highly qualified professionals of physical education
              and sports sciences, promoting multidisciplinary approaches nationwide.
            </p>
            <div className="footer-contact-items">
              <a href="tel:+919425006602" className="footer-contact-item">
                <Phone size={14} /> +91-9425006602
              </a>
              <a href="mailto:cp@aicpe.ac.in" className="footer-contact-item">
                <Mail size={14} /> cp@aicpe.ac.in
              </a>
              <div className="footer-contact-item address">
                <MapPin size={14} />
                <span>DK 3/1/49, Sharda Retreat, Danish Kunj,<br />Kolar Raod, Bhopal (M.P.) - 462042</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-list">
              {quickLinks.map(l => (
                <li key={l.to}><Link to={l.to}>{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Membership */}
          <div className="footer-col">
            <h4 className="footer-heading">Membership</h4>
            <ul className="footer-list">
              {memberForms.map(l => (
                <li key={l.to}><Link to={l.to}>{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Related Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Related Links</h4>
            <ul className="footer-list">
              {relatedLinks.map(l => (
                <li key={l.label}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer">
                    {l.label} <ExternalLink size={11} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>© {new Date().getFullYear()} All India Council of Physical Education. All rights reserved.</span>
          <span>Designed with <span className="heart">♥</span> for Indian Sports</span>
        </div>
      </div>
    </footer>
  );
}
