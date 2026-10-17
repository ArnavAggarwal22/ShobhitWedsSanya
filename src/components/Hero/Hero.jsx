import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { COUPLE } from '../../data/weddingData';
import styles from './Hero.module.css';

function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [palaceLit, setPalaceLit] = useState(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const windows = [];
  const windowPositions = [
    [306, 294], [362, 294], [638, 294], [694, 294],
    [271, 374], [337, 374], [663, 374], [729, 374],
    [413, 367], [470, 367], [530, 367], [587, 367],
    [445, 432], [485, 432], [515, 432], [555, 432],
  ];

  for (let index = 0; index < windowPositions.length; index++) {
    const position = windowPositions[index];
    windows.push(
      <motion.rect
        key={`window-${index}`}
        x={position[0]}
        y={position[1]}
        width="20"
        height="36"
        rx="10"
        className={styles.window}
        animate={{ fill: palaceLit ? '#ffd879' : '#d5b66c', opacity: palaceLit ? [0.8, 1, 0.82] : 0.62 }}
        transition={{ duration: 1.7 + (index % 3) * 0.3, repeat: palaceLit ? Infinity : 0, ease: 'easeInOut', delay: (index % 5) * 0.08 }}
      />
    );
  }

  const celebrationLights = [];
  if (palaceLit && !prefersReducedMotion) {
    for (let index = 0; index < 18; index++) {
      const x = 250 + ((index * 83) % 500);
      const y = 210 + ((index * 47) % 240);
      celebrationLights.push(
        <motion.circle
          key={`spark-${index}`}
          cx={x}
          cy={y}
          r={2 + (index % 3)}
          fill="#d7ab45"
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: [0, 0.9, 0], scale: [0.2, 1.2, 0.1], y: [y, y - 24 - (index % 4) * 10, y - 44] }}
          transition={{ duration: 2.2 + (index % 4) * 0.35, repeat: Infinity, delay: (index % 6) * 0.2, ease: 'easeOut' }}
        />
      );
    }
  }

  function handlePointerMove(event) {
    if (prefersReducedMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    setPointer({
      x: ((event.clientX - bounds.left) / bounds.width - 0.5) * 10,
      y: ((event.clientY - bounds.top) / bounds.height - 0.5) * 7,
    });
  }

  return (
    <section className={styles.heroSection} id="hero">
      <div className={styles.topOrnament} aria-hidden="true"><span>✦</span><span>GURUGRAM · 2026</span><span>✦</span></div>
      <motion.div
        className={styles.heroInner}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <img className={styles.brandLogo} src="/assets/logo-transparent.png" alt="Shobhit and Sanya gold floral monogram" />
        <p className={styles.eyebrow}>Together with their families</p>
        <h1 className={styles.title}>{COUPLE.bride.shortName} <span>&amp;</span> {COUPLE.groom.shortName}</h1>
        <p className={styles.subtitle}>invite you to celebrate their wedding</p>
        <div
          className={`${styles.scene} ${palaceLit ? styles.sceneLit : ''}`}
          onPointerMove={handlePointerMove}
          onPointerLeave={() => setPointer({ x: 0, y: 0 })}
        >
          <motion.div className={styles.sceneParallax} animate={prefersReducedMotion ? undefined : { x: pointer.x, y: pointer.y }} transition={{ type: 'spring', stiffness: 70, damping: 18 }}>
            <svg className={styles.palace} viewBox="0 0 1000 620" role="img" aria-label="An illustrated palace courtyard prepared for a wedding celebration">
              <defs>
                <linearGradient id="skyWash" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#f6f1e5"/><stop offset="1" stopColor="#fffdf8"/></linearGradient>
                <linearGradient id="palaceStone" x1="0" y1="0" x2="0.9" y2="1"><stop stopColor="#fffdf7"/><stop offset=".62" stopColor="#f4ead3"/><stop offset="1" stopColor="#e7d4ab"/></linearGradient>
                <linearGradient id="sunGold" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff0bd"/><stop offset="1" stopColor="#d7aa48"/></linearGradient>
                <linearGradient id="water" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#d3e6dc"/><stop offset="1" stopColor="#a9c9b7"/></linearGradient>
                <filter id="palaceShadow" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="10" stdDeviation="11" floodColor="#806b43" floodOpacity=".13"/></filter>
                <pattern id="jali" width="12" height="12" patternUnits="userSpaceOnUse"><path d="M0 0 12 12M12 0 0 12" stroke="#c4a86c" strokeOpacity=".24" strokeWidth="1"/></pattern>
              </defs>
              <rect width="1000" height="620" rx="28" fill="url(#skyWash)"/>
              <circle cx="500" cy="135" r="88" fill="url(#sunGold)" opacity=".2"/>
              <circle cx="500" cy="135" r="56" fill="url(#sunGold)" opacity=".48"/>
              <path d="M0 375Q170 270 340 374T690 363T1000 354V620H0Z" fill="#e9eee2"/>
              <path d="M0 420Q150 350 300 412T630 412T1000 390V620H0Z" fill="#dce7d7"/>
              <g filter="url(#palaceShadow)" stroke="#c6aa6d" strokeWidth="2">
                <path d="M82 387V236h84v151M834 387V236h84v151" fill="url(#palaceStone)"/>
                <path d="M72 240h104l-8-16h-88zM824 240h104l-8-16h-88z" fill="#d6bb7c"/>
                <path d="M94 224Q124 167 154 224M846 224Q876 167 906 224" fill="url(#palaceStone)"/>
                <path d="M108 220Q124 190 140 220M860 220Q876 190 892 220" fill="none"/>
                <path d="M104 259v50q20-28 40 0v-50M856 259v50q20-28 40 0v-50" fill="#947749"/>
                <path d="M104 259v50q20-28 40 0v-50M856 259v50q20-28 40 0v-50" fill="url(#jali)" stroke="none"/>
                <path d="M178 387V274h644v113" fill="url(#palaceStone)"/>
                <path d="M165 278h670l-12-18H177z" fill="#d6bb7c"/>
                <path d="M222 278V217h112v61M666 278V217h112v61" fill="url(#palaceStone)"/>
                <path d="M210 221h136l-10-17H220zM654 221h136l-10-17H664z" fill="#d6bb7c"/>
                <path d="M231 204Q278 127 325 204M675 204Q722 127 769 204" fill="url(#palaceStone)"/>
                <path d="M252 197Q278 151 304 197M696 197Q722 151 748 197" fill="none"/>
                <path d="M490 270V202h20v68" fill="url(#palaceStone)"/>
                <path d="M447 205Q500 113 553 205M464 196Q500 136 536 196" fill="url(#palaceStone)"/>
                <path d="M442 206h116l-9-13h-98z" fill="#d6bb7c"/>
                <path d="M500 113V88m-8 8h16" fill="none" strokeWidth="3"/>
                <path d="M200 295h600M192 345h616" fill="none" stroke="#cfb77e" strokeOpacity=".7"/>
                <path d="M458 387V322q42-76 84 0v65" fill="#a78c5b" stroke="#b69a62" strokeWidth="4"/>
                <path d="M470 386v-58q30-52 60 0v58" fill="#5e5036" stroke="#e2c880" strokeWidth="2"/>
                <path d="M494 387v-39q6-11 12 0v39" fill="#e8c85f" stroke="none"/>
                {windows}
                <path d="M180 386H820" stroke="#ac925c" strokeWidth="5"/>
                <path d="M168 393H832" stroke="#dfc891" strokeWidth="3"/>
              </g>
              <g fill="#72916b" stroke="#66835f" strokeWidth="2">
                <path d="M76 448q16-61 32 0q18-84 36 0q17-57 34 0v65H76zM822 448q16-61 32 0q18-84 36 0q17-57 34 0v65h-110z"/>
                <path d="M50 473q23-48 46 0v40H50zM904 473q23-48 46 0v40h-46z"/>
              </g>
              <g fill="#d1ad60">
                <circle cx="102" cy="451" r="7"/><circle cx="143" cy="435" r="7"/><circle cx="163" cy="467" r="6"/>
                <circle cx="838" cy="451" r="7"/><circle cx="879" cy="435" r="7"/><circle cx="899" cy="467" r="6"/>
              </g>
              <path d="M0 494Q250 449 500 494T1000 494V620H0Z" fill="#f5f0e4"/>
              <path d="M390 620q30-92 110-92t110 92" fill="#e9ddc3" opacity=".8"/>
              <path d="M405 620q30-73 95-73t95 73" fill="url(#water)" stroke="#c2b17e" strokeWidth="2"/>
              <ellipse cx="500" cy="606" rx="78" ry="11" fill="none" stroke="#fffdf8" strokeWidth="3" opacity=".8"/>
              <path d="M500 548v-24m-14 23 14-11 14 11" fill="none" stroke="#b9944e" strokeWidth="3" strokeLinecap="round"/>
              <path d="M410 553c-14-21-12-34 0-51 12 17 14 30 0 51ZM590 553c14-21 12-34 0-51-12 17-14 30 0 51Z" fill="#91a985"/>
              {celebrationLights}
              <path d="M32 32h28M32 32v28M968 32h-28M968 32v28M32 588h28M32 588v-28M968 588h-28M968 588v-28" fill="none" stroke="#c9a95c" strokeWidth="2" opacity=".65"/>
            </svg>
          </motion.div>
        </div>
        <div className={styles.heroFooter}>
          <p>25th &amp; 26th November 2026 <span>·</span> Gurugram</p>
          <button className={styles.lightButton} type="button" onClick={() => setPalaceLit((lit) => !lit)} aria-pressed={palaceLit}>
            <span className={styles.lampIcon} aria-hidden="true">✦</span>
            {palaceLit ? 'Dim the palace' : 'Light the palace'}
          </button>
        </div>
        <p className={styles.sceneCaption}>{palaceLit ? 'The palace is ready for the celebration' : 'A palace evening, imagined for Sanya & Shobhit'}</p>
      </motion.div>
    </section>
  );
}

export default Hero;
