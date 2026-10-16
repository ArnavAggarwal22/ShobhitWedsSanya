import { useState } from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';
import { VENUE_FULL, MAP_EMBED_URL } from '../../data/weddingData';
import styles from './RSVP.module.css';

const RSVP_EVENTS = [
  { value: 'myra', label: 'Myra – 25th Nov, 11 AM' },
  { value: 'sangeet', label: 'Sangeet – 25th Nov, 7 PM' },
  { value: 'haldi', label: 'Haldi – 26th Nov, 11 AM' },
  { value: 'wedding', label: 'The Wedding – 26th Nov, 8 PM' },
];

export default function RSVP() {
  const headerRef = useScrollReveal();
  const mapRef = useScrollReveal();
  const formRef = useScrollReveal();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    guests: '',
    attending: '',
    events: [],
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setForm((prev) => ({ ...prev, events: [...prev.events, value] }));
    } else {
      const next = [];
      for (let i = 0; i < form.events.length; i++) {
        if (form.events[i] !== value) next.push(form.events[i]);
      }
      setForm((prev) => ({ ...prev, events: next }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const checkboxItems = [];
  for (let i = 0; i < RSVP_EVENTS.length; i++) {
    const ev = RSVP_EVENTS[i];
    checkboxItems.push(
      <label key={ev.value} className={styles.checkItem}>
        <input
          type="checkbox"
          name="events"
          value={ev.value}
          onChange={handleCheckbox}
        />
        {ev.label}
      </label>
    );
  }

  return (
    <section id="rsvp" className={styles.section}>
      <div className={styles.bgOrbs} />
      <div className={styles.sectionHeader} ref={headerRef}>
        <p className={styles.eyebrow}>We Hope to See You</p>
        <h2 className={styles.sectionTitle}>RSVP</h2>
        <div className={styles.divider}>
          <span className={styles.line} />
          <span className={styles.ornament}>✦</span>
          <span className={styles.line} />
        </div>
      </div>

      <div className={styles.layout}>
        <div className={styles.mapWrapper} ref={mapRef}>
          <div className={styles.mapLabel}>
            <span>📍</span>
            <span>{VENUE_FULL}</span>
          </div>
          <div className={styles.mapContainer}>
            <iframe
              id="venue-map"
              title="Crowne Plaza Gurugram Location"
              src={MAP_EMBED_URL}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className={styles.mapDetails}>
            <div className={styles.detailItem}>
              <span>🗓</span>
              <span>25th &amp; 26th November 2026</span>
            </div>
            <div className={styles.detailItem}>
              <span>🏨</span>
              <span>Crowne Plaza, Sec 29, Gurugram</span>
            </div>
          </div>
        </div>

        <div className={styles.formWrapper} ref={formRef}>
          {submitted ? (
            <div className={styles.success}>
              <div className={styles.successIcon}>🌸</div>
              <h3>Thank You!</h3>
              <p>Your RSVP has been received.</p>
              <p>We can't wait to celebrate with you!</p>
            </div>
          ) : (
            <>
              <div className={styles.formHeader}>
                <h3>Confirm Your Attendance</h3>
                <p>Please RSVP by <strong>15th November 2026</strong></p>
              </div>
              <form id="rsvp-form" className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.formGroup}>
                  <label htmlFor="rsvp-name">Full Name</label>
                  <input
                    id="rsvp-name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="rsvp-phone">Phone Number</label>
                  <input
                    id="rsvp-phone"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="rsvp-guests">Number of Guests</label>
                    <input
                      id="rsvp-guests"
                      type="number"
                      name="guests"
                      value={form.guests}
                      onChange={handleChange}
                      min="1"
                      max="10"
                      placeholder="e.g. 2"
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="rsvp-attending">Attending?</label>
                    <div className={styles.selectWrap}>
                      <select
                        id="rsvp-attending"
                        name="attending"
                        value={form.attending}
                        onChange={handleChange}
                        required
                      >
                        <option value="" disabled>Please select…</option>
                        <option value="yes-all">Joyfully Attending All</option>
                        <option value="yes-some">Attending Some Events</option>
                        <option value="no">Unable to Attend</option>
                      </select>
                    </div>
                  </div>
                </div>

                {form.attending === 'yes-some' && (
                  <div className={styles.formGroup}>
                    <label>Which events will you attend?</label>
                    <div className={styles.checkGroup}>
                      {checkboxItems}
                    </div>
                  </div>
                )}

                <div className={styles.formGroup}>
                  <label htmlFor="rsvp-message">A Message for the Couple</label>
                  <textarea
                    id="rsvp-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Share your love and blessings…"
                  />
                </div>

                <button id="rsvp-submit-btn" type="submit" className={styles.submitBtn}>
                  <span>Kindly RSVP</span>
                  <span className={styles.btnIcon}>✦</span>
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
