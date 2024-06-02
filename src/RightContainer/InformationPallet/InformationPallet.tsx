import { IinformationPallet } from '../../Utils/types';
import styles from './informationPallet.module.css';

const InformationPallet = ({ palletName, palletDescription, palletColor }: IinformationPallet) => {
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
