import React, { useRef, useEffect } from 'react';
import '../../index.css';
import './Story.module.css';
import { STORY_TIMELINE, COUPLE } from '../../data/weddingData';

function Story() {
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
    <section id="story" className="story-section" ref={ref}>
      <h2 className="section-title reveal-left">HOW IT ALL BEGAN - Our Story</h2>
      <div className="story-content reveal-right">
        <p className="narrative">A beautiful tale of love, destiny, and family.</p>
        <img src={COUPLE.coupleImg} alt="Couple" className="couple-img" />
        <ul className="timeline">
          {(() => {
            const items = [];
            for (let i = 0; i < STORY_TIMELINE.length; i++) {
              const node = STORY_TIMELINE[i];
              items.push(
                <li key={node.id} className="timeline-item">
                  <span className="icon">{node.icon}</span>
                  <h3>{node.title}</h3>
                  <p>{node.text}</p>
                </li>
              );
            }
            return items;
          })()}
        </ul>
      </div>
    </section>
  );
}

export default Story;
