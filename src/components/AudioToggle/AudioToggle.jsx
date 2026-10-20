import React, { useEffect, useState } from 'react';
import styles from './AudioToggle.module.css';

function AudioToggle({ audioRef }) {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;
    function syncPlayingState() {
      setPlaying(!audio.paused);
    }
    audio.addEventListener('play', syncPlayingState);
    audio.addEventListener('pause', syncPlayingState);
    audio.addEventListener('ended', syncPlayingState);
    return () => {
      audio.removeEventListener('play', syncPlayingState);
      audio.removeEventListener('pause', syncPlayingState);
      audio.removeEventListener('ended', syncPlayingState);
    };
  }, [audioRef]);

  async function toggle() {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setPlaying(true);
      } catch (error) {
        setPlaying(false);
        console.error('Unable to start wedding music:', error);
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
