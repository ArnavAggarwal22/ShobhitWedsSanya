import React from 'react';
import '../../index.css';
import './Cover.module.css';
import { COUPLE } from '../../data/weddingData';

function Cover() {
  const handleOpen = () => {
    const main = document.getElementById('main-content');
    if (main) {
      main.scrollIntoView({ behavior: 'smooth' });
    }
    const audio = document.querySelector('audio');
    if (audio) audio.play();
  };
  return (
    <section id="cover" className="cover">
      <div className="cover-frame">
        <h1 className="title">{COUPLE.bride.shortName} &amp; {COUPLE.groom.shortName}</h1>
        <h2 className="subtitle">|| श्री गणेशाय नमः ||</h2>
        <button className="open-btn" onClick={handleOpen}>OPEN INVITE</button>
      </div>
    </section>
  );
}

export default Cover;
