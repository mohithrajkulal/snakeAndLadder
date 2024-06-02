export interface Players {
  player1: number;
  player2: number;
}

export interface IRightContainer {
  diceNumber: number;
  onRoll: (number: number) => void;
  playerPositions: Players;
  currentPlayer: string;
}

export interface IPlayerInfo {
  player: string;
  playerSvg: string;
  playerPosition: number;
  playerColor: string;
  currentPlayer: string;
}

export interface IinformationPallet {
  palletName: string;
  palletDescription: string;
  palletColor: string;
}

export interface IDice {
  diceNumber: number;
  onRoll: (number: number) => void;
}

export interface IGameBoard {
  playerPositions: Players;
}
