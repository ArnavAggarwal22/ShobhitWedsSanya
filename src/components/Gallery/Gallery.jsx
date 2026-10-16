import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GALLERY_IMAGES } from '../../data/weddingData';
import styles from './Gallery.module.css';

function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  function openLightbox(index) {
    setActiveIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  }

  function goNext() {
    setActiveIndex(function (prev) {
      return (prev + 1) % GALLERY_IMAGES.length;
    });
  }

  function goPrev() {
    setActiveIndex(function (prev) {
      return (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
    });
  }

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      closeLightbox();
    }
  }

  const gridItems = [];
  for (let i = 0; i < GALLERY_IMAGES.length; i++) {
    const img = GALLERY_IMAGES[i];
    gridItems.push(
      <motion.button
        key={i}
        type="button"
        className={styles.gridItem}
        aria-label={`Open photo: ${img.alt}`}
        onClick={function () { openLightbox(i); }}
        whileHover={{ y: -5, scale: 1.025 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 280, damping: 20 }}
      >
        <img src={img.src} alt={img.alt} loading="lazy" />
      </motion.button>
    );
  }

  return (
    <section className={styles.section} id="gallery">
      <h2 className={styles.sectionTitle}>Our Moments</h2>
      <p className={styles.sectionSubtitle}>A glimpse of our journey together</p>
      <div className={styles.grid}>
        {gridItems}
      </div>

      <motion.div
        className={`${styles.lightbox} ${lightboxOpen ? styles.open : ''}`}
        initial={false}
        animate={{ opacity: lightboxOpen ? 1 : 0 }}
        transition={{ duration: 0.24 }}
        onClick={handleOverlayClick}
      >
        <motion.div
          className={styles.lightboxContent}
          initial={{ scale: 0.94, y: 14 }}
          animate={{ scale: lightboxOpen ? 1 : 0.94, y: lightboxOpen ? 0 : 14 }}
          transition={{ type: 'spring', stiffness: 240, damping: 24 }}
        >
          <button className={styles.lightboxClose} onClick={closeLightbox}>✕</button>
          <button className={`${styles.lightboxNav} ${styles.prev}`} onClick={goPrev}>‹</button>
          <motion.img
            key={activeIndex}
            src={GALLERY_IMAGES[activeIndex].src}
            alt={GALLERY_IMAGES[activeIndex].alt}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          />
          <button className={`${styles.lightboxNav} ${styles.next}`} onClick={goNext}>›</button>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Gallery;
