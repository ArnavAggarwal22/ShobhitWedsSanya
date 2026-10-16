import { useEffect, useRef } from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const timer = setTimeout(() => el.classList.add(styles.visible), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleScroll = (e) => {
    e.preventDefault();
    const target = document.querySelector('#invitation');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.overlay} />
      <div className={styles.content} ref={heroRef}>
        <p className={styles.pretext}>— A Celebration of Love —</p>
        <h1 className={styles.title}>Sanya &amp; Shobhit</h1>
        <p className={styles.subtitle}>Are Tying The Knot</p>
        <div className={styles.divider}>
          <span className={styles.line} />
          <span className={styles.diamond}>◆</span>
          <span className={styles.line} />
        </div>
        <p className={styles.date}>25th &amp; 26th November 2026</p>
        <p className={styles.location}>Crowne Plaza, Sec 29, Gurugram</p>
        <a
          href="#invitation"
          id="hero-cta-btn"
          className={styles.cta}
          onClick={handleScroll}
        >
          View Invitation
        </a>
      </div>
      <div className={styles.scrollIndicator}>
        <span className={styles.scrollDot} />
      </div>
    </section>
  );
}
