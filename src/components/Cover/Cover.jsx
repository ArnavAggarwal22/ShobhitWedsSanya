import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import AnimatedGanesha from './AnimatedGanesha';
import styles from './Cover.module.css';

function Cover({ onOpen }) {
  const [isHidden, setIsHidden] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const [isReady, setIsReady] = useState(prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) return undefined;
    const timer = window.setTimeout(() => setIsReady(true), 3900);
    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion]);

  function handleOpen() {
    setIsHidden(true);
    if (onOpen) {
      onOpen();
    }
  }

  const particleElements = [];
  for (let i = 0; i < 12; i++) {
    const style = {
      left: ((i * 37) % 100) + '%',
      top: ((i * 53) % 100) + '%',
      animationDelay: ((i % 4) * 0.7) + 's',
      animationDuration: (2 + (i % 3) * 0.5) + 's',
    };
    particleElements.push(
      <span key={i} className={styles.particle} style={style}></span>
    );
  }

  return (
    <div className={`${styles.overlay} ${isHidden ? styles.hidden : ''}`}>
      <div className={styles.particles}>
        {particleElements}
      </div>
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 30, scale: 0.92 }}
        animate={{ opacity: isHidden ? 0 : 1, y: isHidden ? -32 : 0, scale: isHidden ? 0.94 : 1, rotateX: isHidden ? 12 : 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className={styles.cornerDecor + ' ' + styles.topLeft}></span>
        <span className={styles.cornerDecor + ' ' + styles.topRight}></span>
        <span className={styles.cornerDecor + ' ' + styles.bottomLeft}></span>
        <span className={styles.cornerDecor + ' ' + styles.bottomRight}></span>
        <AnimatedGanesha />
        <motion.p
          className={styles.mantra}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: prefersReducedMotion ? 0 : 2.2, duration: 0.7 }}
        >|| ॐ श्री गणेशाय नमः ||</motion.p>
        <motion.h1
          className={styles.coupleNames}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: prefersReducedMotion ? 0 : 2.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Sanya
          <span className={styles.ampersand}>&</span>
          Shobhit
        </motion.h1>
        <motion.p
          className={styles.tagline}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: prefersReducedMotion ? 0 : 3.2, duration: 0.8 }}
        >Request Your Gracious Presence</motion.p>
        <motion.button
          className={styles.openBtn}
          onClick={handleOpen}
          disabled={!isReady && !prefersReducedMotion}
          aria-label={isReady || prefersReducedMotion ? 'Open wedding invitation' : 'Please wait for the Ganesha blessing animation'}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ opacity: { delay: prefersReducedMotion ? 0 : 3.55, duration: 0.8 }, y: { delay: prefersReducedMotion ? 0 : 3.55, duration: 0.8 } }}
          whileHover={{ scale: 1.06, boxShadow: '0 0 34px rgba(232, 197, 71, 0.62)' }}
          whileTap={{ scale: 0.97 }}
        >
          <span>Open Invitation</span>
          <span className={styles.openArrow} aria-hidden="true">↗</span>
        </motion.button>
        <motion.span
          className={styles.tapHint}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: prefersReducedMotion ? 0 : 4.1, duration: 0.7 }}
        >A celebration of love, family & forever</motion.span>
      </motion.div>
    </div>
  );
}

export default Cover;
