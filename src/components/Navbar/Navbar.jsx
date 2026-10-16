import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { href: '#hero', label: 'Home' },
  { href: '#invitation', label: 'Invitation' },
  { href: '#events', label: 'Events' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#rsvp', label: 'RSVP' },
  { href: '#venue', label: 'Venue' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [shareStatus, setShareStatus] = useState('');
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    const sections = [];
    for (let i = 0; i < NAV_LINKS.length; i++) {
      const section = document.querySelector(NAV_LINKS[i].href);
      if (section) sections.push(section);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (let i = 0; i < entries.length; i++) {
          if (entries[i].isIntersecting) setActiveSection(entries[i].target.id);
        }
      },
      { rootMargin: '-35% 0px -55% 0px' }
    );
    for (let i = 0; i < sections.length; i++) observer.observe(sections[i]);
    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  async function handleShare() {
    const shareData = {
      title: 'Sanya & Shobhit | Wedding Invitation',
      text: 'Join us to celebrate the wedding of Sanya and Shobhit.',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setShareStatus('Invitation shared');
      } catch (error) {
        if (error.name !== 'AbortError') setShareStatus('Sharing is unavailable right now');
      }
    } else if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareData.url);
        setShareStatus('Invitation link copied');
      } catch {
        setShareStatus('Copy the invitation URL from your browser');
      }
    } else {
      setShareStatus('Copy the invitation URL from your browser');
    }

    window.setTimeout(() => setShareStatus(''), 2800);
    setMenuOpen(false);
  }

  const linkItems = [];
  for (let i = 0; i < NAV_LINKS.length; i++) {
    const link = NAV_LINKS[i];
    linkItems.push(
      <li key={link.href}>
        <a
          href={link.href}
          className={`${styles.navLink} ${activeSection === link.href.slice(1) ? styles.active : ''}`}
          aria-current={activeSection === link.href.slice(1) ? 'location' : undefined}
          onClick={(e) => handleLinkClick(e, link.href)}
        >
          {link.label}
        </a>
      </li>
    );
  }
  linkItems.push(
    <li key="share">
      <button className={styles.shareButton} type="button" onClick={handleShare}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <path d="m8.7 10.6 6.6-4.2m-6.6 7 6.6 4.1" />
        </svg>
        Share invite
      </button>
    </li>
  );

  return (
    <>
      <motion.div className={styles.progress} style={{ scaleX: progress }} />
      {menuOpen ? (
        <button
          className={styles.backdrop}
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`} aria-label="Wedding sections">
        <a className={styles.logo} href="#hero" onClick={(e) => handleLinkClick(e, '#hero')} aria-label="Sanya and Shobhit, home">S <span>&</span> S</a>
        <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}>
          {linkItems}
        </ul>
        <button
          id="hamburger-btn"
          className={`${styles.hamburger} ${menuOpen ? styles.active : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
      <span className={styles.shareStatus} role="status" aria-live="polite">{shareStatus}</span>
    </>
  );
}
