import useScrollReveal from '../../hooks/useScrollReveal';
import { EVENTS, VENUE } from '../../data/weddingData';
import styles from './Events.module.css';

export default function Events() {
  const headerRef = useScrollReveal();
  const gridRef = useScrollReveal();

  const cards = [];
  for (let i = 0; i < EVENTS.length; i++) {
    const ev = EVENTS[i];
    cards.push(
      <div key={ev.id} className={styles.card} style={{ '--accent': ev.color }}>
        <div className={styles.cardTopBar} />
        <div className={styles.cardIcon}>{ev.icon}</div>
        <div className={styles.cardNumber}>0{i + 1}</div>
        <h3 className={styles.cardTitle}>{ev.name}</h3>
        <p className={styles.cardTagline}>{ev.tagline}</p>
        <div className={styles.cardDivider} />
        <div className={styles.cardMeta}>
          <span className={styles.cardDate}>{ev.date}</span>
          <span className={styles.cardDot}>·</span>
          <span className={styles.cardTime}>{ev.time}</span>
        </div>
        <div className={styles.cardVenue}>
          <span className={styles.pinIcon}>📍</span>
          {VENUE}
        </div>
        <div className={styles.cardGlow} />
      </div>
    );
  }

  return (
    <section id="events" className={styles.section}>
      <div className={styles.bgPattern} />
      <div className={styles.sectionHeader} ref={headerRef}>
        <p className={styles.eyebrow}>Join Us For</p>
        <h2 className={styles.sectionTitle}>The Celebrations</h2>
        <div className={styles.divider}>
          <span className={styles.line} />
          <span className={styles.ornament}>✦</span>
          <span className={styles.line} />
        </div>
      </div>
      <div className={styles.grid} ref={gridRef}>
        {cards}
      </div>
    </section>
  );
}
