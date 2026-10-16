import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import styles from './PetalShower.module.css';

function PetalShower() {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) return null;

  const petals = [];
  for (let index = 0; index < 28; index++) {
    const seed = index * 47;
    const left = (seed * 17) % 100;
    const size = 8 + (index % 5) * 2;
    const duration = 13 + (index % 8) * 2;
    const delay = -((index * 1.7) % duration);
    const drift = ((index % 2 === 0 ? 1 : -1) * (28 + (index % 6) * 12));
    const rotation = (index % 2 === 0 ? 1 : -1) * (300 + (index % 5) * 90);

    petals.push(
      <motion.span
        key={index}
        className={index % 7 === 0 ? styles.blossom : styles.petal}
        initial={{ y: '-12vh', x: 0, rotate: 0, opacity: 0 }}
        animate={{
          y: '112vh',
          x: [0, drift, -drift * 0.35, drift * 0.6, 0],
          rotate: rotation,
          opacity: [0, 0.82, 0.68, 0.78, 0],
        }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          ease: 'linear',
          x: { duration, ease: 'easeInOut', repeat: Infinity },
          opacity: { duration, times: [0, 0.12, 0.5, 0.82, 1], repeat: Infinity },
        }}
        style={{ left: `${left}%`, width: index % 7 === 0 ? size * 1.4 : size, height: index % 7 === 0 ? size * 1.4 : size * 1.5 }}
        aria-hidden="true"
      />
    );
  }

  return <div className={styles.petalLayer} aria-hidden="true">{petals}</div>;
}

export default PetalShower;