import { useState } from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';
import { GALLERY_IMAGES } from '../../data/weddingData';
import styles from './Gallery.module.css';

export default function Gallery() {
  const headerRef = useScrollReveal();
  const gridRef = useScrollReveal();
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = (index) => setLightboxIndex(index);

  const closeLightbox = () => setLightboxIndex(null);

  const goPrev = () => {
    setLightboxIndex((lightboxIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  };

  const goNext = () => {
    setLightboxIndex((lightboxIndex + 1) % GALLERY_IMAGES.length);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') goPrev();
    if (e.key === 'ArrowRight') goNext();
  };

  const galleryItems = [];
  for (let i = 0; i < GALLERY_IMAGES.length; i++) {
    const img = GALLERY_IMAGES[i];
    galleryItems.push(
      <button
        key={i}
        className={styles.item}
        onClick={() => openLightbox(i)}
        aria-label={`Open photo ${i + 1}`}
      >
        <img src={img.src} alt={img.alt} loading="lazy" />
        <div className={styles.itemOverlay}>
          <span className={styles.zoomIcon}>⊕</span>
        </div>
      </button>
    );
  }

  return (
    <section id="gallery" className={styles.section}>
      <div className={styles.sectionHeader} ref={headerRef}>
        <p className={styles.eyebrow}>Moments We Cherish</p>
        <h2 className={styles.sectionTitle}>Our Story in Frames</h2>
        <div className={styles.divider}>
          <span className={styles.line} />
          <span className={styles.ornament}>✦</span>
          <span className={styles.line} />
        </div>
      </div>

      <div className={styles.masonry} ref={gridRef}>
        {galleryItems}
      </div>

      {lightboxIndex !== null && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <button
            className={styles.lbClose}
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            ✕
          </button>
          <button
            className={`${styles.lbNav} ${styles.lbPrev}`}
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            aria-label="Previous photo"
          >
            ‹
          </button>
          <div
            className={styles.lbContent}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={GALLERY_IMAGES[lightboxIndex].src}
              alt={GALLERY_IMAGES[lightboxIndex].alt}
            />
          </div>
          <button
            className={`${styles.lbNav} ${styles.lbNext}`}
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            aria-label="Next photo"
          >
            ›
          </button>
          <div className={styles.lbCounter}>
            {lightboxIndex + 1} / {GALLERY_IMAGES.length}
          </div>
        </div>
      )}
    </section>
  );
}
