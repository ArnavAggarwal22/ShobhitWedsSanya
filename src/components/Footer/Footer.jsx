import styles from './Footer.module.css';

export default function Footer() {
  const handleScroll = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.topOrb} />
      <div className={styles.divider}>
        <span className={styles.line} />
        <span className={styles.ornament}>❀</span>
        <span className={styles.line} />
      </div>
      <img className={styles.brandMark} src="/assets/logo-transparent.png" alt="Shobhit and Sanya floral monogram" />
      <h2 className={styles.names}>Sanya &amp; Shobhit</h2>
      <p className={styles.date}>25th &amp; 26th November 2026</p>
      <p className={styles.tagline}>We can't wait to celebrate with you!</p>
      <p className={styles.families}>With love, Aggarwal &amp; Garg Families</p>
      <a href="#hero" className={styles.backToTop} onClick={handleScroll} aria-label="Back to top">
        ↑
      </a>
      <div className={styles.bottom}>
        <p>Made with ♥ for the most special day</p>
      </div>
    </footer>
  );
}
