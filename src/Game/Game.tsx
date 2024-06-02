import React, { useEffect, useState } from 'react';
import GameBoard from '../Board/Board';
import { PLAYER } from '../Constants';
import RightContainer from '../RightContainer/RightContainer';
import styles from './game.module.css';

export type PlayerKey = (typeof PLAYER)[keyof typeof PLAYER];

export interface Players {
  player1: number;
  player2: number;
}

const Game = () => {
  const [positions, setPositions] = useState<Players>({ player1: 0, player2: 0 });
  const [currentPlayer, setCurrentPlayer] = useState<PlayerKey>(PLAYER.PLAYER1);
  const [diceNumber, setDiceNumber] = useState<number>(0);

  // const movePlayer = () => {
  //   setPositions((prevPositions: any) => {
  //     const newPositions = { ...prevPositions };
  //     const newPosition = Math.min(prevPositions[currentPlayer] + diceNumber, 100);
  //     if (newPosition <= 100) {
  //       newPositions[currentPlayer] = newPosition;
  //     }
  //     return newPositions;
  //   });
  //   setCurrentPlayer(currentPlayer === 'player1' ? 'player2' : 'player1');
  // };

  const movePlayer = () => {
    setPositions((prevPositions: Players) => {
      const newPositions = { ...prevPositions };
      const currentPosition = prevPositions[currentPlayer];
      let newPosition = Math.min(currentPosition + diceNumber, 100);
      if (newPosition > 100) {
        const overshoot = newPosition - 100;
        newPosition = 100 - overshoot;
        setDiceNumber(diceNumber - overshoot);
      }
      newPositions[currentPlayer] = newPosition;
      return newPositions;
    });
    setCurrentPlayer(currentPlayer === PLAYER.PLAYER1 ? PLAYER.PLAYER2 : PLAYER.PLAYER1);
  };

  useEffect(() => {
    if (diceNumber !== 0) {
      movePlayer();
    }
  }, [diceNumber]);

  return (
    <div className={styles.game}>
      <GameBoard playerPositions={positions} />
      {/* <RightContainer
        diceNumber={diceNumber}
        setDiceNumber={setDiceNumber}
        playerPositions={positions}
        currentPlayer={currentPlayer}
      /> */}
    </div>
  );
};

export default Game;
