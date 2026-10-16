import React, { useEffect, useRef, useState } from 'react';
import '../../index.css';
import './Shloka.module.css';

function Shloka() {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && ref.current.classList.add('visible'),
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <section id="shloka" className="shloka-section" ref={ref}>
      <div className="shloka-card reveal">
        <p className="sanskrit">वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥</p>
        <p className="translation">Until two souls become one</p>
      </div>
    </section>
  );
}

export default Shloka;
