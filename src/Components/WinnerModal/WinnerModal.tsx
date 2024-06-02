import React from 'react';
import { IWinnerModal } from '../../Utils/types';
import styles from './winnerModal.module.css';

const WinnerModal = ({ isVisible, onClose, title, children }: IWinnerModal) => {
  if (!isVisible) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>{title}</h2>
        </div>
        <div className={styles.modalContent}>{children}</div>
        <div className={styles.modalFooter}>
          <button className={styles.closeButton} onClick={onClose}>
            Play Another Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default WinnerModal;
