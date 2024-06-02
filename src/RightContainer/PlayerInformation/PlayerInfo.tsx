import { IPlayerInfo } from '../../Utils/types';
import styles from './playerInfo.module.css';

const PlayerInfo = ({
  player,
  playerSvg,
  playerPosition,
  playerColor,
  currentPlayer,
}: IPlayerInfo) => {
  return (
    <div className={styles.conatiner}>
      <div>
        <img src={playerSvg} alt='player' width={45} />
        <h6 className={styles.playerTag} style={{ color: playerColor }}>
          {player}
        </h6>
      </div>
      {currentPlayer === player ? (
        <div className={styles.postions}>
          <p className={styles.yourTurn}>It's your turn!!!</p>
        </div>
      ) : (
        <div className={styles.postions}>
          <p className={styles.playerPostions}>You are at</p>
          <h1 className={styles.number}>{playerPosition}</h1>
        </div>
      )}
    </div>
  );
};

export default PlayerInfo;
