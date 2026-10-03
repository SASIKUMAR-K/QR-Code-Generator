import { Link } from 'react-router-dom';
import { QrCode, Mail } from 'lucide-react';
import SocialIcon from './SocialIcon.jsx';
import { site, author } from '../config/site.js';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="brand">
            <span className="brand-mark">
              <QrCode size={20} />
            </span>
            <span className="brand-text">
              {site.name}
              <span className="brand-dot">.</span>
            </span>
          </Link>
          <p className="footer-tagline">{site.shortDesc}</p>
          <div className="footer-socials">
            {author.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="social-icon"
              >
                <SocialIcon name={s.icon} size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-col">
          <h4>Product</h4>
          <Link to="/generator">QR Code Generator</Link>
          <Link to="/#features">Features</Link>
          <Link to="/#how">How it works</Link>
          <Link to="/#faq">FAQ</Link>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <Link to="/about">About</Link>
          <a href={author.portfolio} target="_blank" rel="noreferrer">Portfolio</a>
          <a href={`mailto:${author.email}`}>Contact</a>
        </div>

        <div className="footer-col">
          <h4>Get in touch</h4>
          <a href={`mailto:${author.email}`}>
            <Mail size={14} /> {author.email}
          </a>
          <a href={author.phoneHref}>{author.phone}</a>
          <span className="footer-muted">{author.location}</span>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© {year} {site.name}. All rights reserved.</p>
        <p>
          Built with React &amp; Firebase by{' '}
          <a href={author.portfolio} target="_blank" rel="noreferrer">{author.name}</a>
        </p>
      </div>
    </footer>
  );
}
