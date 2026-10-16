import React, { useEffect, useRef, useState } from 'react';
import '../../index.css';
import './CountdownScratch.module.css';
import { WEDDING_DATE } from '../../data/weddingData';

function CountdownScratch() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hrs: 0, mins: 0, secs: 0 });
  const [revealed, setRevealed] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = WEDDING_DATE - now;
      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hrs: 0, mins: 0, secs: 0 });
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hrs = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / (1000 * 60)) % 60);
      const secs = Math.floor((diff / 1000) % 60);
      setTimeLeft({ days, hrs, mins, secs });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;
    ctx.fillStyle = '#aa0000';
    ctx.fillRect(0, 0, width, height);
    const brush = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 30, 0, Math.PI * 2);
      ctx.fill();
    };
    canvas.addEventListener('mousemove', (e) => { if (e.buttons) brush(e); });
    canvas.addEventListener('click', () => { setRevealed(true); });
    return () => {
      canvas.removeEventListener('mousemove', brush);
      canvas.removeEventListener('click', () => {});
    };
  }, []);

  return (
    <section id="countdown" className="countdown-section reveal">
      <div className="timer-cards">
        <div className="card"><span>{timeLeft.days}</span><small>Days</small></div>
        <div className="card"><span>{timeLeft.hrs}</span><small>Hours</small></div>
        <div className="card"><span>{timeLeft.mins}</span><small>Minutes</small></div>
        <div className="card"><span>{timeLeft.secs}</span><small>Seconds</small></div>
      </div>
      <div className="scratch-card">
        {revealed ? (
          <div className="reveal-text">26th November 2026</div>
        ) : (
          <canvas ref={canvasRef} className="scratch-canvas" />
        )}
        <button className="save-btn">SAVE THE DATE</button>
        <button className="calendar-btn">ADD TO CALENDAR</button>
      </div>
    </section>
  );
}

export default CountdownScratch;
