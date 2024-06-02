import playerOneSvg from '../Images/P1.svg';
import playerTwoSvg from '../Images/P2.svg';
import start from '../Images/Down arrow.svg';
import { snakePositions, ladderPositions } from '../Utils/Utility';
import { IGameBoard } from '../Utils/types';
import styles from './board.module.css';

const GameBoard = ({ playerPositions }: IGameBoard) => {
  // const boardCells = Array.from({ length: 100 }, (_, i) => i + 1).reverse();
  const rows = 10;
  const columns = 10;

  const baardCell = Array.from({ length: rows }, (_, rowIndex) => {
    const base = rowIndex * columns + 1;
    const row = Array.from({ length: columns }, (_, colIndex) => base + colIndex);
    return rowIndex % 2 === 0 ? row.reverse() : row;
  });

  const getLineStyle = (start: any, end: any) => {
    const cellSize = 10;
    const startRow = Math.floor((start - 1) / 10);
    const startCol = (start - 1) % 10;
    const endRow = Math.floor((end - 1) / 10);
    const endCol = (end - 1) % 10;
    console.log(
      start,
      'startcol',
      startCol,
      10 - ((start - 1) % 10),
      'startRow',
      startRow,
      end,
      'endRow',
      endRow,
      'endCol',
      endCol,
      10 - ((end - 1) % 10)
    );

    const x1 = startCol * cellSize + cellSize / 2;
    const y1 = (10 - startRow) * cellSize + cellSize / 2;
    const x2 = endCol * cellSize + cellSize / 2;
    const y2 = (10 - endRow) * cellSize + cellSize / 2;

    const deltaX = x2 - x1;
    const deltaY = y2 - y1;
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    const length = Math.sqrt(deltaX ** 2 + deltaY ** 2);

    return {
      width: `${length}vw`,
      transform: `rotate(${angle}deg)`,
      transformOrigin: '0 0',
      // top: `calc(${y1}vw)`,
      // left: `calc(${x1}vw)`,
    };
  };

  const boardCelll = baardCell?.flatMap(item => item).reverse();

  return (
    <div className={styles.board}>
      {boardCelll?.map((singleCell, index) => {
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
          <div key={index} className={evenCell ? styles.evenNumberCell : styles.oddNumberCell}>
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
                <p style={{ color: '#FFB900' }} className={styles.finishPoint}>
                  {snake.name}
                </p>
              )}
              {ladder && (
                <p style={{ color: '#D14228' }} className={styles.finishPoint}>
                  {ladder.name}
                </p>
              )}
            </div>
            {/* {ladderPositions.map(({ currentPosition, gotoPosition }, index) => (
              <div
                key={`ladder-${index}`}
                className={styles.ladder}
                style={getLineStyle(currentPosition, gotoPosition)}
              />
            ))} */}
            {/*  {snakePositions.map(({ currentPosition, gotoPosition }, index) => {
              // console.log(
              //   currentPosition,
              //   gotoPosition,
              //   singleCell,
              //   [currentPosition, gotoPosition].includes(singleCell)
              // );
              return (
                currentPosition === singleCell && (
                  <div
                    key={`snake-${index}`}
                    className={styles.snake}
                    style={getLineStyle(currentPosition, gotoPosition)}
                  />
                )
              );
            })} */}
          </div>
        );
      })}
    </div>
  );
};

export default GameBoard;
