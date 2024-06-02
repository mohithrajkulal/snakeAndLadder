import React from 'react';
import Dice from './Dice/Dice';
import { rightContainerConst } from '../Constants';
import playerOneSvg from '../Images/P1.svg';
import playerTwoSvg from '../Images/P2.svg';
import InformationPallet from './InformationPallet/InformationPallet';
import PlayerInfo from './PlayerInformation/PlayerInfo';
import { IRightContainer } from '../Utils/types';
import styles from './rightContainer.module.css';

const RightContainer = ({
  diceNumber,
  onRoll,
  playerPositions,
  currentPlayer,
}: IRightContainer) => {
  const currentPlayerInformation =
    currentPlayer === 'player1' ? rightContainerConst.PLAYER_ONE : rightContainerConst.PLAYER_TWO;
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
        <PlayerInfo
          player={rightContainerConst.PLAYER_ONE}
          playerSvg={playerOneSvg}
          playerPosition={playerPositions.player1}
          playerColor={'#D62D09'}
          currentPlayer={currentPlayerInformation}
        />
        <PlayerInfo
          player={rightContainerConst.PLAYER_TWO}
          playerSvg={playerTwoSvg}
          playerPosition={playerPositions.player2}
          playerColor={'#25A1BE'}
          currentPlayer={currentPlayerInformation}
        />
      </div>
      <Dice diceNumber={diceNumber} onRoll={onRoll} />
    </div>
  );
};

export default RightContainer;
