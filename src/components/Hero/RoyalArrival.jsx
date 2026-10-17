import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { COUPLE } from '../../data/weddingData';
import styles from './RoyalArrival.module.css';

function SideFlorals({ side }) {
  const leaves = [];
  for (let index = 0; index < 15; index++) {
    const y = 42 + index * 58;
    const x = 38 + ((index * 19) % 45);
    const direction = index % 2 === 0 ? 1 : -1;
    leaves.push(
      <path
        key={`leaf-${index}`}
        d={`M${x} ${y} q${direction * 33} -32 ${direction * 42} -5 q${-direction * 15} 24 ${-direction * 42} 5Z`}
        fill={index % 3 === 0 ? '#d4b76f' : '#c69d55'}
        fillOpacity=".78"
        stroke="#f4dfaa"
        strokeOpacity=".62"
        strokeWidth="1.2"
      />
    );
  }

  const blooms = [];
  const bloomPositions = [
    [106, 94, 13], [54, 222, 10], [119, 354, 15],
    [63, 492, 12], [122, 636, 15], [52, 778, 10], [102, 884, 13],
  ];
  for (let bloomIndex = 0; bloomIndex < bloomPositions.length; bloomIndex++) {
    const [x, y, radius] = bloomPositions[bloomIndex];
    const petals = [];
    for (let petalIndex = 0; petalIndex < 8; petalIndex++) {
      petals.push(
        <ellipse
          key={`petal-${petalIndex}`}
          cx="0"
          cy={-radius * 0.72}
          rx={radius * 0.31}
          ry={radius * 0.67}
          transform={`rotate(${petalIndex * 45})`}
          fill={bloomIndex % 2 === 0 ? '#f6e8c7' : '#ead8ad'}
          stroke="#bf984e"
          strokeWidth=".8"
        />
      );
    }
    blooms.push(
      <g key={`bloom-${bloomIndex}`} transform={`translate(${x} ${y})`}>
        {petals}
        <circle r={radius * 0.24} fill="#d0a34f" stroke="#fff0c7" strokeWidth="1" />
      </g>
    );
  }

  return (
    <svg className={`${styles.sideFlorals} ${side === 'right' ? styles.sideFloralsRight : ''}`} viewBox="0 0 170 930" preserveAspectRatio="none" aria-hidden="true">
      <path className={styles.flowerStem} d="M18 930C73 827 32 740 92 637S43 462 98 354 45 162 123 0" />
      <path className={styles.flowerStemFine} d="M35 930C1 821 97 773 48 681S124 510 71 420 137 214 99 112" />
      {leaves}
      {blooms}
      <circle cx="83" cy="165" r="3" fill="#f1d68f" />
      <circle cx="77" cy="573" r="2.5" fill="#f1d68f" />
      <circle cx="105" cy="724" r="3" fill="#f1d68f" />
    </svg>
  );
}

function RoyalArrival({ entered }) {
  const prefersReducedMotion = useReducedMotion();
  const [gatesOpen, setGatesOpen] = useState(false);
  const [namesRevealed, setNamesRevealed] = useState(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!entered) return undefined;
    const gateTimer = window.setTimeout(() => setGatesOpen(true), 0);
    const namesTimer = window.setTimeout(() => setNamesRevealed(true), prefersReducedMotion ? 0 : 1250);
    return () => {
      window.clearTimeout(gateTimer);
      window.clearTimeout(namesTimer);
    };
  }, [entered, prefersReducedMotion]);

  function replayEntrance() {
    setNamesRevealed(false);
    setGatesOpen(false);
    if (prefersReducedMotion) {
      setGatesOpen(true);
      setNamesRevealed(true);
      return;
    }
    window.setTimeout(() => setGatesOpen(true), 1550);
    window.setTimeout(() => setNamesRevealed(true), 2800);
  }

  function handlePointerMove(event) {
    if (prefersReducedMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    setPointer({
      x: ((event.clientX - bounds.left) / bounds.width - 0.5) * 9,
      y: ((event.clientY - bounds.top) / bounds.height - 0.5) * 6,
    });
  }

  const gateTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 2.25, ease: [0.72, 0, 0.28, 1] };

  return (
    <section className={styles.hero} id="hero" onPointerMove={handlePointerMove} onPointerLeave={() => setPointer({ x: 0, y: 0 })}>
      <motion.img
        className={styles.palacePhoto}
        src="/assets/mysore-palace-lit.jpg"
        alt="Mysore Palace illuminated with thousands of golden lights at night"
        fetchPriority="high"
        style={prefersReducedMotion ? undefined : { x: pointer.x, y: pointer.y, scale: 1.06 }}
      />
      <div className={styles.imageVignette} />
      <div className={styles.topFrame} aria-hidden="true" />
      <motion.div className={styles.floralFrame} animate={prefersReducedMotion ? undefined : { y: [0, -5, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}>
        <SideFlorals side="left" />
        <SideFlorals side="right" />
      </motion.div>
      <img className={styles.brandLogo} src="/assets/logo-transparent.png" alt="Shobhit and Sanya gold floral monogram" />
      <p className={styles.location}>A ROYAL CELEBRATION · GURUGRAM</p>

      <motion.div
        className={`${styles.gate} ${styles.gateLeft}`}
        animate={{ rotateY: gatesOpen ? -104 : 0 }}
        transition={gateTransition}
        aria-hidden="true"
      >
        <span className={styles.gateArch} />
        <span className={styles.gatePanel} />
      </motion.div>
      <motion.div
        className={`${styles.gate} ${styles.gateRight}`}
        animate={{ rotateY: gatesOpen ? 104 : 0 }}
        transition={gateTransition}
        aria-hidden="true"
      >
        <span className={styles.gateArch} />
        <span className={styles.gatePanel} />
      </motion.div>

      <div className={`${styles.centerReveal} ${namesRevealed ? styles.centerRevealVisible : ''}`} aria-live="polite">
        <motion.p
          className={styles.invitationLine}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: namesRevealed ? 1 : 0, y: namesRevealed ? 0 : 18 }}
          transition={{ duration: 0.8, delay: 0.05 }}
        >Together with their families</motion.p>
        <motion.h1
          className={styles.coupleNames}
          initial={{ opacity: 0, y: 24, scale: 0.94 }}
          animate={{ opacity: namesRevealed ? 1 : 0, y: namesRevealed ? 0 : 24, scale: namesRevealed ? 1 : 0.94 }}
          transition={{ duration: 1.05, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <span>{COUPLE.bride.shortName}</span>
          <i>&amp;</i>
          <span>{COUPLE.groom.shortName}</span>
        </motion.h1>
        <motion.p
          className={styles.weddingLine}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: namesRevealed ? 1 : 0, y: namesRevealed ? 0 : 12 }}
          transition={{ duration: 0.8, delay: 0.55 }}
        >ARE GETTING MARRIED</motion.p>
        <motion.div
          className={styles.eventDetails}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: namesRevealed ? 1 : 0, y: namesRevealed ? 0 : 10 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >25th &amp; 26th November 2026 <span>·</span> Gurugram</motion.div>
        <motion.button
          className={styles.replayButton}
          type="button"
          onClick={replayEntrance}
          initial={{ opacity: 0 }}
          animate={{ opacity: namesRevealed ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <span aria-hidden="true">✦</span> Replay the royal entrance
        </motion.button>
      </div>

      <a className={styles.photoCredit} href="https://unsplash.com/photos/mysore-palace-illuminated-at-night-x3y2phkf7fI" target="_blank" rel="noopener noreferrer">
        Palace photograph · Mahendra Maddirala / Unsplash
      </a>
      <div className={styles.bottomRule} aria-hidden="true" />
    </section>
  );
}

export default RoyalArrival;