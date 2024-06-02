import React from 'react';
import styles from './informationPallet.module.css';

interface InformationPallet {
  palletName: string;
  palletDescription: string;
  palletColor: string;
}

const InformationPallet = ({ palletName, palletDescription, palletColor }: InformationPallet) => {
  return (
    <div className={styles.pallet}>
      <div className={styles.diagonalLine} style={{ backgroundColor: palletColor }}></div>
      <h3 className={styles.palletDescription} style={{ color: palletColor }}>
        {palletDescription}
      </h3>
      <p className={styles.palletName}>{palletName}</p>
    </div>
  );
};

export default InformationPallet;
