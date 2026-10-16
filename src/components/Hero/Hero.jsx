import React from 'react';
import '../index.css';
import './Hero.module.css';
import { COUPLE } from '../../data/weddingData';

function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-bg" style={{ backgroundImage: `url(${COUPLE.heroBg})` }} />
      <div className="hero-content reveal">
        <h1 className="hero-title">You Are Invited To Celebrate Love</h1>
        <p className="hero-subtitle">Celebrating Love &amp; Tradition</p>
        <div className="down-arrow">SCROLL ↓</div>
      </div>
    </section>
  );
}

export default Hero;
