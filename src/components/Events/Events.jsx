import React from 'react';
import { motion } from 'motion/react';
import { EVENTS, VENUE_MAP_URL } from '../../data/weddingData';
import styles from './Events.module.css';

function Events() {
  const cards = [];
  for (let i = 0; i < EVENTS.length; i++) {
    const evt = EVENTS[i];
    cards.push(
      <motion.article
        key={evt.id}
        className={styles.eventCard}
        whileHover={{ y: -6, boxShadow: '0 18px 38px rgba(92, 6, 18, 0.16)' }}
        whileTap={{ scale: 0.99 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      >
        <div className={styles.eventHeader}>
          <span className={styles.eventIcon}>{evt.icon}</span>
          <h3 className={styles.eventName}>{evt.name}</h3>
        </div>
        <div className={styles.eventBody}>
          <p className={styles.eventSubtitle}>{evt.subtitle}</p>
          <div className={styles.eventDetail}>
            <span className={styles.eventDetailIcon}>📅</span>
            <span className={styles.eventDetailText}>{evt.date}</span>
          </div>
          <div className={styles.eventDetail}>
            <span className={styles.eventDetailIcon}>🕐</span>
            <span className={styles.eventDetailText}>{evt.time}</span>
          </div>
          <div className={styles.eventDetail}>
            <span className={styles.eventDetailIcon}>📍</span>
            <span className={styles.eventDetailText}>{evt.venue}</span>
          </div>
          {evt.dressCode ? (
            <div className={styles.dressCode}>{evt.dressCode}</div>
          ) : null}
          <a
            className={styles.mapLink}
            href={VENUE_MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Location on Google Maps
          </a>
        </div>
      </motion.article>
    );
  }

  return (
    <section className={styles.section} id="events">
      <h2 className={styles.sectionTitle}>Wedding Events</h2>
      <p className={styles.sectionSubtitle}>Join us for the celebrations</p>
      <div className={styles.eventsGrid}>
        {cards}
      </div>
    </section>
  );
}

export default Events;
