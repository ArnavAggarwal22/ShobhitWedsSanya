import React from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { COUPLE } from '../../data/weddingData';
import styles from './Hero.module.css';

function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 0.25], [0, 110]);

  return (
    <section className={styles.heroSection} id="hero">
      <motion.img
        className={styles.bgImage}
        src={COUPLE.heroBg}
        alt="Wedding backdrop"
        loading="eager"
        style={prefersReducedMotion ? undefined : { y: backgroundY, scale: 1.08 }}
      />
      <div className={styles.gradientOverlay}></div>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.h1 className={styles.names}>
          {COUPLE.bride.shortName}
          <span className={styles.ampersand}>&</span>
          {COUPLE.groom.shortName}
        </motion.h1>
        <p className={styles.subtitle}>Are Getting Married</p>
        <p className={styles.dateLocation}>25th & 26th November 2026 &nbsp;|&nbsp; Gurugram</p>
        <div className={styles.divider}></div>
      </motion.div>
      <div className={styles.scrollHint}>
        <div className={styles.scrollArrow}></div>
      </div>
    </section>
  );
}

export default Hero;
