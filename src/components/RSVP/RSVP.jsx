import React, { useState } from 'react';
import styles from './RSVP.module.css';

function RSVP() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', relation: '', wishes: '' });

  function handleChange(e) {
    setFormData(function (prev) {
      const updated = {};
      updated.name = prev.name;
      updated.relation = prev.relation;
      updated.wishes = prev.wishes;
      updated[e.target.name] = e.target.value;
      return updated;
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className={styles.section} id="rsvp">
        <div className={styles.successMessage}>
          <div className={styles.successIcon}>✨</div>
          <p className={styles.successText}>Thank You!</p>
          <p className={styles.successSubtext}>Your blessings mean the world to us</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section} id="rsvp">
      <h2 className={styles.sectionTitle}>Send Your Blessings</h2>
      <p className={styles.sectionSubtitle}>We would love to hear from you</p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Your Name</label>
          <input
            className={styles.input}
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Relation</label>
          <select
            className={styles.select}
            name="relation"
            value={formData.relation}
            onChange={handleChange}
            required
          >
            <option value="">Select relation</option>
            <option value="family">Family</option>
            <option value="friend">Friend</option>
            <option value="colleague">Colleague</option>
          </select>
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Your Wishes</label>
          <textarea
            className={styles.textarea}
            name="wishes"
            placeholder="Write your blessings..."
            value={formData.wishes}
            onChange={handleChange}
          />
        </div>
        <button className={styles.submitBtn} type="submit">
          Send Blessings
        </button>
      </form>
    </section>
  );
}

export default RSVP;
