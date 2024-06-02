import React, { useState } from 'react';
import { rightContainerConst } from '../../Constants';
import styles from './dice.module.css';

const Dice = ({ diceNumber, setDiceNumber }: any) => {
  const generateDiceNumber = () => {
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    setDiceNumber(randomNumber);
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
