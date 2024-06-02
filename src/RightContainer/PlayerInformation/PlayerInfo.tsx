import styles from './playerInfo.module.css';

interface PlayerInfo {
  player: string;
  playerSvg: string;
  playerPosition: number;
}

const PlayerInfo = ({ player, playerSvg, playerPosition }: PlayerInfo) => {
  return (
    <div className={styles.conatiner}>
      <div>
        <img src={playerSvg} alt='' width={45} />
        <h6 className={styles.playerTag} style={{ color: '#D62D09' }}>
          {player}
        </h6>
      </div>
      <div className={styles.postions}>
        <p className={styles.playerPostions}>You are at</p>
        <h1 className={styles.number}>{playerPosition}</h1>
      </div>
    </div>
  );
};

export default PlayerInfo;
