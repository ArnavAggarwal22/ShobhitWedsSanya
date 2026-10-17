import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { EVENTS, VENUE_MAP_URL } from '../../data/weddingData';
import styles from './Events.module.css';

function Events() {
  const [activeDay, setActiveDay] = useState('all');
  const [expandedEvent, setExpandedEvent] = useState('sangeet');
  const dayOptions = [
    { id: 'all', label: 'All celebrations', shortLabel: 'All' },
    { id: '25', label: 'Wednesday · 25 November', shortLabel: 'Day one' },
    { id: '26', label: 'Thursday · 26 November', shortLabel: 'Day two' },
  ];
  const visibleEvents = [];

  for (let i = 0; i < EVENTS.length; i++) {
    const event = EVENTS[i];
    const eventDay = event.id === 'myra' || event.id === 'sangeet' ? '25' : '26';
    if (activeDay === 'all' || activeDay === eventDay) {
      visibleEvents.push({ event, eventDay, originalIndex: i });
    }
  }

  const cards = [];
  for (let i = 0; i < visibleEvents.length; i++) {
    const { event: evt, eventDay, originalIndex } = visibleEvents[i];
    const isExpanded = expandedEvent === evt.id;
    cards.push(
      <motion.article
        key={evt.id}
        className={`${styles.eventCard} ${styles[evt.id]} ${isExpanded ? styles.expanded : ''}`}
        layout
        transition={{ layout: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } }}
      >
        <button
          className={styles.eventTrigger}
          type="button"
          onClick={() => setExpandedEvent(isExpanded ? '' : evt.id)}
          aria-expanded={isExpanded}
          aria-controls={`event-details-${evt.id}`}
        >
          <span className={styles.eventNumber}>{String(originalIndex + 1).padStart(2, '0')}</span>
          <span className={styles.eventDate}>
            <span>{eventDay === '25' ? 'WEDNESDAY' : 'THURSDAY'}</span>
            {eventDay} <small>NOV</small>
          </span>
          <span className={styles.eventMain}>
            <span className={styles.eventName}>{evt.name}</span>
            <span className={styles.eventSubtitle}>{evt.subtitle}</span>
          </span>
          <span className={styles.eventTime}>{evt.time}</span>
          <span className={`${styles.expandIcon} ${isExpanded ? styles.expandIconOpen : ''}`} aria-hidden="true">+</span>
        </button>

        <AnimatePresence initial={false}>
          {isExpanded ? (
            <motion.div
              id={`event-details-${evt.id}`}
              className={styles.eventDetails}
              role="region"
              aria-label={`${evt.name} event details`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.detailsInner}>
                <div className={styles.detailsMeta}>
                  <span><b>VENUE</b>{evt.venue}</span>
                  {evt.dressCode ? <span><b>DRESS CODE</b>{evt.dressCode.replace('Dress Code: ', '')}</span> : null}
                </div>
                <a className={styles.mapLink} href={VENUE_MAP_URL} target="_blank" rel="noopener noreferrer">
                  <span aria-hidden="true">↗</span> Get directions
                </a>
                <a className={`${styles.mapLink} ${styles.blessingLink}`} href="#rsvp">
                  <span aria-hidden="true">✦</span> Send a blessing
                </a>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.article>
    );
  }

  const dayTabs = [];
  for (let i = 0; i < dayOptions.length; i++) {
    const option = dayOptions[i];
    dayTabs.push(
      <button
        key={option.id}
        className={`${styles.dayTab} ${activeDay === option.id ? styles.dayTabActive : ''}`}
        type="button"
        role="tab"
        id={`day-tab-${option.id}`}
        aria-selected={activeDay === option.id}
        aria-controls="events-list"
        onClick={() => {
          setActiveDay(option.id);
          if (option.id === '25') setExpandedEvent('myra');
          else if (option.id === '26') setExpandedEvent('haldi');
          else setExpandedEvent('sangeet');
        }}
      >
        <span className={styles.dayTabLong}>{option.label}</span>
        <span className={styles.dayTabShort}>{option.shortLabel}</span>
      </button>
    );
  }

  return (
    <section className={styles.section} id="events">
      <div className={styles.sectionHead}>
        <p className={styles.eyebrow}>THE CELEBRATIONS</p>
        <h2 className={styles.sectionTitle}>Four ceremonies. One beginning.</h2>
        <p className={styles.sectionSubtitle}>Join the Aggarwal and Garg families for every part of the celebration.</p>
      </div>
      <div className={styles.daySelector} role="tablist" aria-label="Filter wedding celebrations by day">
        {dayTabs}
      </div>
      <div className={styles.itinerary}>
        <div className={styles.timelineRail} aria-hidden="true"><span /></div>
        <motion.div
          id="events-list"
          className={styles.eventsGrid}
          role="tabpanel"
          aria-labelledby={`day-tab-${activeDay}`}
          layout
        >
          {cards}
        </motion.div>
      </div>
      <p className={styles.venueNote}><span aria-hidden="true">✦</span> All celebrations take place at Crowne Plaza, Sector 29, Gurugram</p>
    </section>
  );
}

export default Events;
