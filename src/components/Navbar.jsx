import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, Menu, X } from 'lucide-react';
import { site, nav } from '../config/site.js';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  // Handles links like "/#features" from any page.
  const handleHashLink = (event, to) => {
    if (!to.startsWith('/#')) return;
    event.preventDefault();
    const id = to.slice(2);
    const scroll = () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(scroll, 150);
    } else {
      scroll();
    }
  };

  return (
    <header className={`navbar ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container navbar-inner">
        <Link to="/" className="brand" aria-label={`${site.name} home`}>
          <span className="brand-mark">
            <QrCode size={20} />
          </span>
          <span className="brand-text">
            {site.name}
            <span className="brand-dot">.</span>
          </span>
        </Link>

        <nav className="nav-links" aria-label="Primary navigation">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="nav-link"
              onClick={(e) => handleHashLink(e, item.to)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          <Link to="/generator" className="btn btn-primary btn-sm nav-cta">
            <QrCode size={16} />
            <span>Build QR Code</span>
          </Link>
          <button
            type="button"
            className="nav-toggle"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className="container mobile-menu-inner">
              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="mobile-link"
                  onClick={(e) => handleHashLink(e, item.to)}
                >
                  {item.label}
                </Link>
              ))}
              <Link to="/generator" className="btn btn-primary mobile-cta">
                <QrCode size={16} /> Build QR Code
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
