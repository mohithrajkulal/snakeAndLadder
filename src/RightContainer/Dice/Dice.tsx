import { rightContainerConst } from '../../Constants';
import { IDice } from '../../Utils/types';
import styles from './dice.module.css';

const Dice = ({ diceNumber, onRoll }: IDice) => {
  const generateDiceNumber = () => {
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    onRoll(randomNumber);
  };
  return (
    <div className={styles.diceConatiner}>
      <div>
        <button onClick={generateDiceNumber} className={styles.playButton}>
          PLAY
        </button>
        <input type='number' value={diceNumber} readOnly={true} className={styles.diceInput} />
      </div>
      <p className={styles.playText}>{rightContainerConst.CLICK_PLAY_INFO}</p>
    </div>
  );
};

export default Dice;
