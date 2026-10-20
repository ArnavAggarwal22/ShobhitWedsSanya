import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { GALLERY_IMAGES } from '../../data/weddingData';
import styles from './Gallery.module.css';

function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isPointerDown, setIsPointerDown] = useState(false);
  const pointerStartX = useRef(null);
  const suppressClick = useRef(false);
  const isPaused = isManuallyPaused || isHovered || isFocused || isPointerDown || lightboxOpen;

  useEffect(() => {
    if (isPaused || lightboxOpen) return undefined;
    const interval = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % GALLERY_IMAGES.length);
    }, 3000);
    return () => window.clearInterval(interval);
  }, [isPaused, lightboxOpen]);

  useEffect(() => {
    if (!lightboxOpen) return undefined;
    function handleKeyDown(event) {
      if (event.key === 'Escape') setLightboxOpen(false);
      if (event.key === 'ArrowRight') goNext();
      if (event.key === 'ArrowLeft') goPrev();
    }
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxOpen]);

  function openLightbox(index) {
    setActiveIndex(index);
    setLightboxOpen(true);
  }

  function closeLightbox() {
    setLightboxOpen(false);
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

  function handlePointerDown(event) {
    pointerStartX.current = event.clientX;
    setIsPointerDown(true);
  }

  function handlePointerUp(event) {
    if (pointerStartX.current !== null && event.pointerType !== 'mouse') {
      const distance = event.clientX - pointerStartX.current;
      if (Math.abs(distance) > 45) {
        suppressClick.current = true;
        window.setTimeout(() => {
          suppressClick.current = false;
        }, 0);
        if (distance < 0) goNext();
        else goPrev();
      }
    }
    pointerStartX.current = null;
    setIsPointerDown(false);
  }

  function handleSlideClick(index) {
    if (suppressClick.current) {
      suppressClick.current = false;
      return;
    }
    if (index === activeIndex) openLightbox(index);
    else setActiveIndex(index);
  }

  const activeImage = GALLERY_IMAGES[activeIndex];
  const slides = [-1, 0, 1].map((offset) => {
    const imageIndex = (activeIndex + offset + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
    const image = GALLERY_IMAGES[imageIndex];
    const positionClass = offset === 0 ? styles.slideActive : offset === -1 ? styles.slidePrev : styles.slideNext;
    return (
      <motion.button
        key={imageIndex}
        type="button"
        className={`${styles.slide} ${positionClass}`}
        aria-label={offset === 0 ? `View photo ${activeIndex + 1} of ${GALLERY_IMAGES.length}: ${image.alt}` : `Go to photo ${imageIndex + 1}: ${image.alt}`}
        aria-current={offset === 0 ? 'true' : undefined}
        onClick={() => handleSlideClick(imageIndex)}
      >
        <img src={image.src} alt={image.alt} />
        <span className={styles.slideCaption}>
          <span className={styles.slideTag}>OUR MOMENTS</span>
          <span className={styles.slideTitle}>Sanya &amp; Shobhit</span>
          <span className={styles.slideSubtext}>A moment to remember</span>
        </span>
      </motion.button>
    );
  });

  return (
    <section className={styles.section} id="gallery">
      <h2 className={styles.sectionTitle}>Our Moments</h2>
      <p className={styles.sectionSubtitle}>A glimpse of our journey together</p>
      <div
        className={styles.carousel}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocusCapture={() => setIsFocused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setIsFocused(false);
        }}
      >
        <div
          className={styles.stage}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => {
            pointerStartX.current = null;
            setIsPointerDown(false);
          }}
        >
          {slides}
        </div>
        <div className={styles.carouselFooter}>
          <span className={styles.slideCount} aria-live="polite">
            {String(activeIndex + 1).padStart(2, '0')} <span>/</span> {String(GALLERY_IMAGES.length).padStart(2, '0')}
          </span>
          <div className={styles.pagination} role="tablist" aria-label="Choose a photo">
            {GALLERY_IMAGES.map((image, index) => (
              <button
                key={image.src}
                type="button"
                role="tab"
                aria-label={`Show photo ${index + 1}`}
                aria-selected={index === activeIndex}
                className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ''}`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
          <button
            className={styles.pauseButton}
            type="button"
            onClick={() => setIsManuallyPaused((paused) => !paused)}
            aria-label={isManuallyPaused ? 'Resume slideshow' : 'Pause slideshow'}
            aria-pressed={isManuallyPaused}
          >
            <span aria-hidden="true">{isManuallyPaused ? '▶' : 'Ⅱ'}</span>
            {isManuallyPaused ? 'Play slideshow' : 'Pause slideshow'}
          </button>
        </div>
      </div>

      <motion.div
        className={`${styles.lightbox} ${lightboxOpen ? styles.open : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Our Moments photo viewer"
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
          <button className={styles.lightboxClose} type="button" onClick={closeLightbox} aria-label="Close photo viewer">✕</button>
          <button className={`${styles.lightboxNav} ${styles.prev}`} type="button" onClick={goPrev} aria-label="Previous photo">‹</button>
          <motion.img
            key={activeIndex}
            src={activeImage.src}
            alt={activeImage.alt}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          />
          <button className={`${styles.lightboxNav} ${styles.next}`} type="button" onClick={goNext} aria-label="Next photo">›</button>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Gallery;
