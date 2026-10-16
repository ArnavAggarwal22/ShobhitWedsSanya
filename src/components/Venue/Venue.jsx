import React from 'react';
import styles from './Venue.module.css';

function Venue() {
  return (
    <section className={styles.venueSection} id="venue">
      <h2 className={styles.heading}>FIND YOUR WAY TO US - The Venue</h2>
      <div className={styles.mapContainer}>
        <iframe
          src="https://www.google.com/maps?q=Crowne+Plaza+Sector+29+Gurugram&output=embed"
          width="100%"
          height="300"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <p className={styles.address}>Crowne Plaza, Sector 29, Gurugram</p>
    </section>
  );
}

export default Venue;
