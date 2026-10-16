import React from 'react';
import styles from './Venue.module.css';

function Venue() {
  return (
    <section className={styles.venueSection} id="venue">
      <h2 className={styles.heading}>FIND YOUR WAY TO US - The Venue</h2>
      <div className={styles.mapContainer}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.123456789!2d77.034567!3d28.459876!2m3!1f0!2f0!3f0!4m2!3d28.459876!4d77.034567"
          width="100%"
          height="300"
          style={{ border: 0 }}
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
