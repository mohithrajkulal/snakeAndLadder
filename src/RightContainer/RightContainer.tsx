import React from 'react';
import Dice from './Dice/Dice';
import { rightContainerConst } from '../Constants';
import playerOneSvg from '../Images/P1.svg';
import playerTwoSvg from '../Images/P2.svg';
import styles from './rightContainer.module.css';
import InformationPallet from './InformationPallet/InformationPallet';
import PlayerInfo from './PlayerInformation/PlayerInfo';
import { Players } from '../Game/Game';

interface RightContainer {
  diceNumber: number;
  setDiceNumber: (number: number) => void;
  playerPositions: Players;
  currentPlayer: string;
}

const RightContainer = ({
  diceNumber,
  setDiceNumber,
  playerPositions,
  currentPlayer,
}: RightContainer) => {
  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.mainHeader}>{rightContainerConst.SNAKES_AND_LADDERS}</h2>
        <p className={styles.contentHeader}>{rightContainerConst.GAME}</p>
      </div>
      <div>
        <p className={styles.legendsHeader}>{rightContainerConst.LEGENDS}</p>
        <div className={styles.palletConatiner}>
          <InformationPallet
            palletName={rightContainerConst.LADDERS}
            palletDescription={'L1 - L5'}
            palletColor={'#FFB900'}
          />
          <InformationPallet
            palletName={rightContainerConst.SNAKES}
            palletDescription={'S1 - S5'}
            palletColor={'#D14228'}
          />
        </div>
      </div>
      <div>
        <p className={styles.playerInfoHeader}>{rightContainerConst.PLAYERS_INFO}</p>
        <p className={styles.playersInfo}>
          {currentPlayer === 'player1'
            ? `${rightContainerConst.PLAY_CHANCE} ${rightContainerConst.PLAYER_ONE}`
            : `${rightContainerConst.PLAY_CHANCE} ${rightContainerConst.PLAYER_TWO}`}
        </p>
        <PlayerInfo
          player={rightContainerConst.PLAYER_ONE}
          playerSvg={playerOneSvg}
          playerPosition={playerPositions.player1}
        />
        <PlayerInfo
          player={rightContainerConst.PLAYER_TWO}
          playerSvg={playerTwoSvg}
          playerPosition={playerPositions.player2}
        />
      </div>
      <Dice diceNumber={diceNumber} setDiceNumber={setDiceNumber} />
    </div>
  );
};

export default RightContainer;
