import React from 'react';
import { MAP_EMBED_URL, VENUE_MAP_URL } from '../../data/weddingData';
import styles from './Venue.module.css';

function Venue() {
  return (
    <section className={styles.venueSection} id="venue">
      <h2 className={styles.heading}>FIND YOUR WAY TO US - The Venue</h2>
      <div className={styles.mapContainer}>
        <iframe
          src={MAP_EMBED_URL}
          width="100%"
          height="300"
          allowFullScreen=""
          loading="lazy"
          title="Map showing Crowne Plaza in Sector 29, Gurugram"
          referrerPolicy="strict-origin-when-cross-origin"
        ></iframe>
      </div>
      <p className={styles.address}>Crowne Plaza, Sector 29, Gurugram</p>
      <a className={styles.mapLink} href={VENUE_MAP_URL} target="_blank" rel="noopener noreferrer">
        Open directions in Google Maps <span aria-hidden="true">↗</span>
      </a>
    </section>
  );
}

export default Venue;
