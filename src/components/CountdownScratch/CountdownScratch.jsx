import React, { useState, useEffect, useRef, useCallback } from 'react';
import { WEDDING_DATE } from '../../data/weddingData';
import styles from './CountdownScratch.module.css';

function CountdownScratch() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);

  useEffect(function () {
    function calcTime() {
      const now = new Date();
      const diff = WEDDING_DATE - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins: Math.floor((diff / (1000 * 60)) % 60),
        secs: Math.floor((diff / 1000) % 60),
      });
    }
    calcTime();
    const interval = setInterval(calcTime, 1000);
    return function () { clearInterval(interval); };
  }, []);

  useEffect(function () {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);
    ctx.fillStyle = '#D4AF37';
    ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.fillStyle = '#3D0007';
    ctx.font = '600 13px Cinzel, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SCRATCH TO REVEAL', rect.width / 2, rect.height / 2 - 10);
    ctx.fillText('THE DATE', rect.width / 2, rect.height / 2 + 10);
  }, []);

  const scratch = useCallback(function (x, y) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const px = (x - rect.left);
    const py = (y - rect.top);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(px, py, 22, 0, Math.PI * 2);
    ctx.fill();

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparent = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) transparent++;
    }
    const totalPixels = imageData.data.length / 4;
    if (transparent / totalPixels > 0.4) {
      canvas.style.opacity = '0';
      canvas.style.transition = 'opacity 0.5s ease';
    }
  }, []);

  function handlePointerDown(e) {
    isDrawingRef.current = true;
    scratch(e.clientX, e.clientY);
  }

  function handlePointerMove(e) {
    if (!isDrawingRef.current) return;
    scratch(e.clientX, e.clientY);
  }

  function handlePointerUp() {
    isDrawingRef.current = false;
  }

  function handleTouchStart(e) {
    e.preventDefault();
    isDrawingRef.current = true;
    scratch(e.touches[0].clientX, e.touches[0].clientY);
  }

  function handleTouchMove(e) {
    e.preventDefault();
    if (!isDrawingRef.current) return;
    scratch(e.touches[0].clientX, e.touches[0].clientY);
  }

  function handleTouchEnd() {
    isDrawingRef.current = false;
  }

  function pad(n) {
    return n < 10 ? '0' + n : '' + n;
  }

  function handleAddCalendar() {
    const start = '20261126T143000Z';
    const end = '20261127T023000Z';
    const url = 'https://www.google.com/calendar/render?action=TEMPLATE&text=Sanya+%26+Shobhit+Wedding&dates=' + start + '/' + end + '&location=Crowne+Plaza,+Sector+29,+Gurugram&details=Wedding+Celebration';
    window.open(url, '_blank');
  }

  const timerUnits = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.mins, label: 'Minutes' },
    { value: timeLeft.secs, label: 'Seconds' },
  ];

  const timerBoxes = [];
  for (let i = 0; i < timerUnits.length; i++) {
    timerBoxes.push(
      <div key={timerUnits[i].label} className={styles.timerBox}>
        <div className={styles.timerValue}>{pad(timerUnits[i].value)}</div>
        <div className={styles.timerLabel}>{timerUnits[i].label}</div>
      </div>
    );
  }

  return (
    <section className={styles.section} id="countdown">
      <h2 className={styles.heading}>Save The Date</h2>
      <p className={styles.subheading}>The countdown begins</p>
      <div className={styles.timerGrid}>
        {timerBoxes}
      </div>
      <div className={styles.scratchWrapper}>
        <p className={styles.scratchLabel}>Scratch To Reveal The Date</p>
        <div className={styles.scratchContainer}>
          <div className={styles.scratchReveal}>
            <span className={styles.revealDate}>26th November 2026</span>
            <span className={styles.revealSubtext}>The Big Day</span>
          </div>
          <canvas
            ref={canvasRef}
            className={styles.scratchCanvas}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />
        </div>
      </div>
      <button className={styles.calendarBtn} onClick={handleAddCalendar}>
        📅 Add to Calendar
      </button>
    </section>
  );
}

export default CountdownScratch;
