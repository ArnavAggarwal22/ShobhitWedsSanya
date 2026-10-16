import React, { useState, useEffect } from 'react';
import '../../index.css';
import './AudioToggle.module.css';

function AudioToggle({ audioRef }) {
  const [playing, setPlaying] = useState(false);
  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };
  useEffect(() => {
    const icon = document.getElementById('audio-toggle');
    if (icon) icon.addEventListener('click', toggle);
    return () => {
      if (icon) icon.removeEventListener('click', toggle);
    };
  }, [audioRef, playing]);
  return (
    <div id="audio-toggle" className="audio-toggle">
      <span className={playing ? 'icon playing' : 'icon'}>♪</span>
    </div>
  );
}

export default AudioToggle;
