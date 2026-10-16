import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { href: '#invitation', label: 'Invitation' },
  { href: '#events', label: 'Events' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#rsvp', label: 'RSVP' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  const linkItems = [];
  for (let i = 0; i < NAV_LINKS.length; i++) {
    const link = NAV_LINKS[i];
    linkItems.push(
      <li key={link.href}>
        <a
          href={link.href}
          className={styles.navLink}
          onClick={(e) => handleLinkClick(e, link.href)}
        >
          {link.label}
        </a>
      </li>
    );
  }

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.logo}>S &amp; S</div>
      <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}>
        {linkItems}
      </ul>
      <button
        id="hamburger-btn"
        className={`${styles.hamburger} ${menuOpen ? styles.active : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}
