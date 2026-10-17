import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import styles from './PetalShower.module.css';

function PetalShower() {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) return null;

  const petals = [];
  for (let index = 0; index < 48; index++) {
    const seed = index * 47;
    const middlePetal = index % 4 === 0;
    const left = middlePetal
      ? 18 + ((seed * 17) % 64)
      : index % 2 === 0
        ? (seed * 13) % 18
        : 82 + ((seed * 11) % 18);
    const size = 8 + (index % 6) * 2;
    const duration = 11 + (index % 8) * 1.8;
    const delay = -((index * 1.7) % duration);
    const inward = left < 50 ? 1 : -1;
    const drift = inward * (24 + (index % 6) * 11);
    const rotation = (index % 2 === 0 ? 1 : -1) * (330 + (index % 5) * 95);

    petals.push(
      <motion.span
        key={index}
        className={index % 5 === 0 ? styles.blossom : styles.petal}
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
        style={{ left: `${left}%`, width: index % 5 === 0 ? size * 1.5 : size, height: index % 5 === 0 ? size * 1.5 : size * 1.5 }}
        aria-hidden="true"
      />
    );
  }

  return <div className={styles.petalLayer} aria-hidden="true">{petals}</div>;
}

export default PetalShower;