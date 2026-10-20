import React, { useState } from 'react';
import { motion } from 'motion/react';
import { EVENTS } from '../../data/weddingData';
import styles from './Events.module.css';

function Events() {
  const [activeDay, setActiveDay] = useState('all');
  const dayOptions = [
    { id: 'all', label: 'All celebrations', shortLabel: 'All' },
    { id: '25', label: 'Wednesday · 25 November', shortLabel: 'Day one' },
    { id: '26', label: 'Thursday · 26 November', shortLabel: 'Day two' },
  ];
  const dateGroups = [
    { id: '25', weekday: 'Wednesday', date: '25', events: [] },
    { id: '26', weekday: 'Thursday', date: '26', events: [] },
  ];

  for (const event of EVENTS) {
    const eventDay = event.id === 'myra' || event.id === 'sangeet' ? '25' : '26';
    if (activeDay === 'all' || activeDay === eventDay) {
      dateGroups.find((group) => group.id === eventDay).events.push(event);
    }
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
          {dateGroups.filter((group) => group.events.length > 0).map((group) => (
            <motion.section className={styles.dateGroup} key={group.id} layout>
              <div className={styles.dateHeading}>
                <span>{group.weekday}</span>
                <strong>{group.date}</strong>
                <span>November 2026</span>
              </div>
              <div className={styles.eventList}>
                {group.events.map((event) => (
                  <article className={`${styles.eventRow} ${styles[event.id]}`} key={event.id}>
                    <span className={styles.eventTime}>{event.time}</span>
                    <div className={styles.eventInfo}>
                      <h3 className={styles.eventName}>{event.name}</h3>
                      <p className={styles.eventSubtitle}>{event.subtitle}</p>
                    </div>
                    {event.dressCode ? (
                      <span className={styles.dressCode}>{event.dressCode.replace('Dress Code: ', '')}</span>
                    ) : null}
                  </article>
                ))}
              </div>
            </motion.section>
          ))}
        </motion.div>
      </div>
      <p className={styles.venueNote}><span aria-hidden="true">✦</span> All celebrations take place at Crowne Plaza, Sector 29, Gurugram</p>
    </section>
  );
}

export default Events;
