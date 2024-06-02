import playerOneSvg from '../Images/P1.svg';
import playerTwoSvg from '../Images/P2.svg';
import start from '../Images/Down arrow.svg';
import { snakePositions, ladderPositions } from '../Utils/Utility';
import { IGameBoard } from '../Utils/types';
import { links } from '../Constants';
import styles from './board.module.css';
import { useEffect } from 'react';

const GameBoard = ({ playerPositions }: IGameBoard) => {
  const rows = 10;
  const columns = 10;

  const boardCell = Array.from({ length: rows }, (_, rowIndex) => {
    const base = rowIndex * columns + 1;
    const row = Array.from({ length: columns }, (_, colIndex) => base + colIndex);
    return rowIndex % 2 === 0 ? row.reverse() : row;
  });

  const boardCellReversed = boardCell?.flatMap(item => item).reverse();

  useEffect(() => {
    const drawLines = () => {
      [...ladderPositions, ...snakePositions].forEach(position => {
        const startElement = document.getElementById(`cell-${position.currentPosition}`);
        const endElement = document.getElementById(`cell-${position.gotoPosition}`);

        if (startElement && endElement) {
          const startRect = startElement.getBoundingClientRect();
          const endRect = endElement.getBoundingClientRect();
          const startX = (startRect.left + startRect.width / 2).toString();
          const startY = (startRect.top + startRect.height / 2).toString();
          const endX = (endRect.left + endRect.width / 2).toString();
          const endY = (endRect.top + endRect.height / 2).toString();

          const line = document.createElementNS(links.W3G_LINE_LINK, 'line');
          line.setAttribute('x1', startX);
          line.setAttribute('y1', startY);
          line.setAttribute('x2', endX);
          line.setAttribute('y2', endY);
          line.setAttribute('stroke', snakePositions.includes(position) ? '#D14228' : '#FFB900');
          line.setAttribute('stroke-width', '3');
          line.setAttribute('stroke-linecap', 'round');

          document.getElementById('svg-container')?.appendChild(line);
        }
      });
    };

    drawLines();
  }, []);

  return (
    <div className={styles.boardConatiner}>
      <svg id='svg-container' className={styles.svgBoard}></svg>
      <div className={styles.board}>
        {boardCellReversed?.map((singleCell, index) => {
          const evenCell = singleCell % 2 === 0;
          const isPlayer1Here = singleCell === playerPositions.player1;
          const isPlayer2Here = singleCell === playerPositions.player2;
          const snake = snakePositions.find(
            snakePosition =>
              snakePosition.currentPosition === singleCell ||
              snakePosition.gotoPosition === singleCell
          );
          const ladder = ladderPositions.find(
            ladderPosition =>
              ladderPosition.currentPosition === singleCell ||
              ladderPosition.gotoPosition === singleCell
          );

          return (
            <div
              key={index}
              id={`cell-${singleCell}`}
              className={evenCell ? styles.evenNumberCell : styles.oddNumberCell}
            >
              <p className={styles.cellNumber}>{singleCell}</p>
              <div className={styles.playersPosition}>
                <div>
                  {!(isPlayer2Here || isPlayer1Here) &&
                    (ladder || snake || singleCell === 1 || singleCell === 100) && (
                      <div className={styles.emptySpace}></div>
                    )}
                  {isPlayer1Here && <img src={playerOneSvg} alt='Player 1' width={25} />}
                  {isPlayer2Here && <img src={playerTwoSvg} alt='Player 2' width={25} />}
                </div>
                {singleCell === 1 && (
                  <p className={styles.startPoint}>
                    START
                    <img src={start} alt='start' width={12} style={{ marginLeft: '13px' }} />
                  </p>
                )}
                {singleCell === 100 && <p className={styles.finishPoint}>FINISH</p>}
                {snake && (
                  <p style={{ color: '#D14228' }} className={styles.finishPoint}>
                    {snake.name}
                  </p>
                )}
                {ladder && (
                  <p style={{ color: '#FFB900' }} className={styles.finishPoint}>
                    {ladder.name}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GameBoard;
