'use client'
import React, { useState, useEffect } from 'react';
import styles from './slideshow.module.scss'
export default function ArticleSlideshow({ articles}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!articles || articles.length === 0) return;

  }, [articles]);

  if (!articles || articles.length === 0) return null;

  const { imgUrl, title, excerpt } = articles[currentIndex];

  const goToPrev = () => {
    setCurrentIndex(currentIndex === 0 ? articles.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === articles.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.slide}>
        <img src={imgUrl} alt={title} className={styles.image} />
        <div className={styles.textContainer}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{excerpt}</p>
        </div>
      </div>

      <div className={styles.navigation}>
        <button onClick={goToPrev} aria-label="Previous slide" className={styles.navButton}>
          &#10094;
        </button>
        <button onClick={goToNext} aria-label="Next slide" className={styles.navButton}>
          &#10095;
        </button>
      </div>

      <div className={styles.dotsContainer}>
        {articles.map((_, idx) => (
          <button
          key={idx}
          onClick={() => setCurrentIndex(idx)}
          className={styles.dot} // className expects a string here
          style={{ backgroundColor: idx === currentIndex ? '#333' : '#ccc' }} // inline style for color
          aria-label={`Go to article ${idx + 1}`}
        />
        ))}
      </div>
    </div>
  );
}

