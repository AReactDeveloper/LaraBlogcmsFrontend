import React from 'react';
import styles from './Modal.module.scss'

export default function Modal({ children, isOpen, onClose , title}) {
  
  const popUpTitle = title || ''

  if (!isOpen) return null;

  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={styles.popupContent} onClick={e => e.stopPropagation()}>
        <button className={styles.popupClose} onClick={onClose}>×</button>
        <h1>{popUpTitle}</h1>
        {children}
      </div>
    </div>
  );
}