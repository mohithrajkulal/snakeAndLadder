import React, { useEffect, useState } from 'react';
import GameBoard from '../Board/Board';
import { PLAYER } from '../Constants';
import RightContainer from '../RightContainer/RightContainer';
import WinnerModal from '../Components/WinnerModal/WinnerModal';
import { Players } from '../Utils/types';
import styles from './game.module.css';
import { ladderPositions, snakePositions } from '../Utils/Utility';

export type PlayerKey = (typeof PLAYER)[keyof typeof PLAYER];

const Game = () => {
  const [positions, setPositions] = useState<Players>({ player1: 0, player2: 0 });
  const [currentPlayer, setCurrentPlayer] = useState<PlayerKey>(PLAYER.PLAYER1);
  const [diceNumber, setDiceNumber] = useState<number>(0);
  const [playerWon, setPlayerWon] = useState<boolean>(false);
  const [rollCounter, setRollCounter] = useState<number>(0);

  const checkWinner = (positions: Players): { hasWinner: boolean; winnerKey?: string } => {
    for (const [key, value] of Object.entries(positions)) {
      if (value >= 100) {
        return { hasWinner: true, winnerKey: key };
      }
    }
    return { hasWinner: false };
  };

  const movePlayer = () => {
    setPositions((prevPositions: Players) => {
      const newPositions = { ...prevPositions };
      const currentPosition = prevPositions[currentPlayer];
      let newPosition = currentPosition + diceNumber;

      if (newPosition <= 100) {
        const snake = snakePositions.find(
          snakePosition => snakePosition.currentPosition === newPosition
        );
        const ladder = ladderPositions.find(
          ladderPosition => ladderPosition.currentPosition === newPosition
        );

        if (snake) {
          newPosition = snake.gotoPosition;
        } else if (ladder) {
          newPosition = ladder.gotoPosition;
        }

        newPositions[currentPlayer] = newPosition;
      }
      const { hasWinner } = checkWinner(newPositions);
      if (hasWinner) {
        setPlayerWon(hasWinner);
      }
      return newPositions;
    });
    setCurrentPlayer(currentPlayer === PLAYER.PLAYER1 ? PLAYER.PLAYER2 : PLAYER.PLAYER1);
  };

  const resetGame = () => {
    setPositions({ player1: 0, player2: 0 });
    setCurrentPlayer(PLAYER.PLAYER1);
    setDiceNumber(0);
    setPlayerWon(false);
  };

  useEffect(() => {
    if (diceNumber !== 0) {
      movePlayer();
    }
  }, [rollCounter]);

  const handleDiceRoll = (number: number) => {
    setDiceNumber(number);
    setRollCounter(prev => prev + 1);
  };

  return (
    <div className={styles.game}>
      <GameBoard playerPositions={positions} />
      <RightContainer
        diceNumber={diceNumber}
        onRoll={handleDiceRoll}
        playerPositions={positions}
        currentPlayer={currentPlayer}
      />
      {playerWon && (
        <WinnerModal isVisible={playerWon} onClose={resetGame} title='Congratulations'>
          <p>
            {checkWinner(positions)?.winnerKey === PLAYER.PLAYER1 ? 'Player 1' : 'Player 2'} has won
            the game!
          </p>
        </WinnerModal>
      )}
    </div>
  );
};

export default Game;
