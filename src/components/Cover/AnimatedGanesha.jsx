import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import styles from './AnimatedGanesha.module.css';

function AnimatedGanesha() {
  const prefersReducedMotion = useReducedMotion();
  const draw = (duration, delay) => ({
    duration: prefersReducedMotion ? 0 : duration,
    delay: prefersReducedMotion ? 0 : delay,
  });

  return (
    <div className={styles.shrine}>
      <motion.svg
        className={styles.mandala}
        viewBox="0 0 240 240"
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.7, rotate: -35 }}
        animate={{ opacity: 1, scale: 1, rotate: prefersReducedMotion ? 0 : 325 }}
        transition={{ duration: prefersReducedMotion ? 0 : 3.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <circle cx="120" cy="120" r="104" />
        <circle cx="120" cy="120" r="94" />
        <path d="M120 8v20m0 184v20M8 120h20m184 0h20M41 41l14 14m130 130 14 14m0-158-14 14M55 185l-14 14" />
        <path d="m120 31 7 14 15 2-11 10 3 15-14-7-14 7 3-15-11-10 15-2z" />
        <path d="m120 169 7 14 15 2-11 10 3 15-14-7-14 7 3-15-11-10 15-2z" />
        <path d="m31 120 14-7 2-15 10 11 15-3-7 14 7 14-15-3-10 11-2-15z" />
        <path d="m169 120 14-7 2-15 10 11 15-3-7 14 7 14-15-3-10 11-2-15z" />
        <circle cx="120" cy="120" r="73" />
      </motion.svg>
      <motion.svg
        className={styles.ganesha}
        viewBox="0 0 200 200"
        role="img"
        aria-label="An illuminated golden illustration of Lord Ganesha"
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.78, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 1.25, delay: prefersReducedMotion ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <defs>
          <linearGradient id="ganeshaGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fff0aa" />
            <stop offset="48%" stopColor="#e8c547" />
            <stop offset="100%" stopColor="#bd8720" />
          </linearGradient>
        </defs>
        <g className={styles.ganeshaLines} stroke="url(#ganeshaGold)" strokeLinecap="round" strokeLinejoin="round">
          <motion.path d="M77 49Q100 22 123 49L119 62H81Z" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={draw(0.8, 0.25)} />
          <motion.path d="M86 42Q100 30 114 42M100 27V16M94 16H106" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={draw(0.6, 0.42)} />
          <motion.path d="M81 64C72 56 59 57 53 69C49 79 55 98 73 106M119 64C128 56 141 57 147 69C151 79 145 98 127 106" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={draw(0.9, 0.72)} />
          <motion.path d="M78 63C78 49 87 43 100 43C113 43 122 49 122 63V101C122 116 112 126 100 126C88 126 78 116 78 101Z" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={draw(1, 0.95)} />
          <motion.path d="M84 84Q89 79 94 84M106 84Q111 79 116 84" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={draw(0.45, 1.35)} />
          <motion.path d="M84 96C89 92 94 93 98 97M116 96C111 92 106 93 102 97" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={draw(0.45, 1.45)} />
          <motion.path d="M94 101C91 114 91 130 100 136C109 142 120 137 117 129C116 125 112 124 108 128" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={draw(0.9, 1.65)} />
          <motion.path d="M83 106L75 118Q72 123 78 124L91 121M117 106L125 118Q128 123 122 124L109 121" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={draw(0.6, 1.8)} />
          <motion.path d="M70 135C75 126 84 123 91 125M130 135C125 126 116 123 109 125M69 141Q100 154 131 141" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={draw(0.8, 2)} />
          <motion.path d="M73 153Q100 142 127 153L143 168Q100 178 57 168Z" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={draw(0.8, 2.15)} />
          <motion.path d="M79 161Q100 154 121 161M65 170Q100 183 135 170" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={draw(0.6, 2.3)} />
        </g>
        <motion.circle cx="100" cy="103" r="3" fill="#f5d56d" initial={{ scale: 0 }} animate={{ scale: [0, 1.25, 1] }} transition={{ delay: prefersReducedMotion ? 0 : 2.1, duration: 0.5 }} />
      </motion.svg>
      {!prefersReducedMotion ? (
        <motion.span
          className={styles.aura}
          animate={{ opacity: [0.24, 0.56, 0.24], scale: [0.92, 1.06, 0.92] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      ) : null}
      <motion.span
        className={styles.lamp}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: prefersReducedMotion ? 0 : 2.5, duration: 0.7 }}
        aria-hidden="true"
      >
        <span />
      </motion.span>
    </div>
  );
}

export default AnimatedGanesha;