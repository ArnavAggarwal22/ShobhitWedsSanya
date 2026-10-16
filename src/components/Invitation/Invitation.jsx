import useScrollReveal from '../../hooks/useScrollReveal';
import styles from './Invitation.module.css';

export default function Invitation() {
  const sectionRef = useScrollReveal();
  const portraitsRef = useScrollReveal();
  const textRef = useScrollReveal();

  return (
    <section id="invitation" className={styles.section}>
      <div className={styles.sectionHeader} ref={sectionRef}>
        <p className={styles.eyebrow}>With Joyful Hearts</p>
        <h2 className={styles.sectionTitle}>The Invitation</h2>
        <div className={styles.divider}>
          <span className={styles.line} />
          <span className={styles.ornament}>✦</span>
          <span className={styles.line} />
        </div>
      </div>

      <div className={styles.portraits} ref={portraitsRef}>
        <div className={styles.portraitCard}>
          <div className={styles.portraitFrame}>
            <img
              src="/assets/9e7dbaa4-f976-4bac-b54e-cf1a4f835c7a.jpg"
              alt="Sanya — The Bride"
            />
            <div className={styles.frameRing} />
          </div>
          <div className={styles.portraitLabel}>
            <p className={styles.role}>The Bride</p>
            <h3 className={styles.personName}>Sanya</h3>
            <p className={styles.family}>Aggarwal Family</p>
          </div>
        </div>

        <div className={styles.coupleCenter}>
          <div className={styles.ampersand}>&amp;</div>
          <div className={styles.coupleImgWrap}>
            <img
              src="/assets/e7a0d4ee-e3b4-40cb-9390-6a2ce8e12f45.jpg"
              alt="Sanya and Shobhit together"
              className={styles.coupleImg}
            />
          </div>
        </div>

        <div className={styles.portraitCard}>
          <div className={styles.portraitFrame}>
            <img
              src="/assets/8cf98440-c309-4a53-afce-775c6019bc88.jpg"
              alt="Shobhit — The Groom"
            />
            <div className={styles.frameRing} />
          </div>
          <div className={styles.portraitLabel}>
            <p className={styles.role}>The Groom</p>
            <h3 className={styles.personName}>Shobhit</h3>
            <p className={styles.family}>Garg Family</p>
          </div>
        </div>
      </div>

      <div className={styles.invitationText} ref={textRef}>
        <div className={styles.quoteMark}>"</div>
        <p className={styles.body}>
          Together with their families, the{' '}
          <strong>Aggarwal Family</strong> &amp; the{' '}
          <strong>Garg Family</strong> joyfully invite you to share in their
          happiness as they celebrate the marriage of their beloved children.
        </p>
        <p className={styles.note}>
          Your presence would be the greatest blessing of all.
        </p>
        <div className={styles.florals}>❀ ❀ ❀</div>
      </div>
    </section>
  );
}
