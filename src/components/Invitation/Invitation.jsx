import React from 'react';
import { COUPLE, GRANDPARENTS } from '../../data/weddingData';
import styles from './Invitation.module.css';

function Invitation() {
  const motifElements = [];
  for (let i = 0; i < 5; i++) {
    motifElements.push(<span key={i} className={styles.motif}></span>);
  }

  return (
    <section className={styles.section} id="invitation">
      <div className={styles.card}>
        <div className={styles.archTop}></div>
        <div className={styles.hangingMotifs}>
          {motifElements}
        </div>
        <div className={styles.body}>
          <svg className={styles.ganeshaIcon} viewBox="0 0 64 64" role="img" aria-label="Lord Ganesha">
            <path d="M20 17c0-7 5-12 12-12s12 5 12 12v5c6 3 10 9 10 16 0 9-7 16-16 16h-4v5H22v-8c-8-3-13-10-13-18 0-7 4-13 11-16v-5Zm5 8c-5 2-8 6-8 11 0 7 6 12 13 12h8c5 0 9-4 9-9s-4-9-9-9h-4c-3 0-5-2-5-5v-7c-3 0-4 2-4 7Zm16-3c3 1 6 3 8 6-1-6-4-10-8-12v6Zm-14 32h9v-4h-9v4Z" fill="currentColor" />
            <circle cx="27" cy="22" r="1.5" fill="var(--maroon)" />
            <circle cx="39" cy="22" r="1.5" fill="var(--maroon)" />
          </svg>
          <p className={styles.mantra}>|| ॐ श्री गणेशाय नमः ||</p>
          <p className={styles.shloka}>
            वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।<br />
            निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
          </p>
          <div className={styles.goldDivider}></div>
          <p className={styles.hosts}>
            {GRANDPARENTS.grandmother}<br />& {GRANDPARENTS.grandfather}
          </p>
          <p className={styles.inviteText}>
            solicit your gracious presence on the auspicious occasion of wedding of their beloved granddaughter
          </p>
          <h2 className={styles.brideName}>{COUPLE.bride.name}</h2>
          <p className={styles.parentInfo}>({COUPLE.bride.parents})</p>
          <p className={styles.withText}>with</p>
          <h2 className={styles.groomName}>{COUPLE.groom.name}</h2>
          <p className={styles.parentInfo}>({COUPLE.groom.parents})</p>
        </div>
        <span className={styles.cornerOrnament + ' ' + styles.bl}></span>
        <span className={styles.cornerOrnament + ' ' + styles.br}></span>
      </div>
    </section>
  );
}

export default Invitation;
