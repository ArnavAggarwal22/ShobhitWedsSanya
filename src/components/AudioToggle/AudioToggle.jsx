import React, { useState } from 'react';
import styles from './AudioToggle.module.css';

function AudioToggle({ audioRef }) {
  const [playing, setPlaying] = useState(false);

  async function toggle() {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    }
  }

  return (
    <button
      id="audio-toggle"
      className={styles.audioToggle}
      onClick={toggle}
      type="button"
      aria-label={playing ? 'Turn music off' : 'Turn music on'}
      aria-pressed={playing}
    >
      <span className={playing ? styles.iconPlaying : styles.icon} aria-hidden="true">♪</span>
    </button>
  );
}

export default AudioToggle;
