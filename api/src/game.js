export function checkHorizontalWin(playerId, board) {
  let count = 0;
  for (let i = 0; i < 6; i++) {
    count = 0;
    for (let j = 0; j < 7; j++) {
      if (board[i][j] === playerId) {
        count++;
        if (count === 4) {
          return true;
        }
      } else {
        count = 0;
      }
    }
  }
  return false;
}

export function checkVerticalWin(playerId, board) {
  let count = 0;
  for (let j = 0; j < 7; j++) {
    count = 0;
    for (let i = 0; i < 6; i++) {
      if (board[i][j] === playerId) {
        count++;
        if (count === 4) {
          return true;
        }
      } else {
        count = 0;
      }
    }
  }
  return false;
}

export class ConnectedFour {
  games;

  constructor() {
    this.games = [];
  }

  createGame(gameId) {
    this.games[gameId] = {
      players: [{ id: 1 }],
      board: Array.from({ length: 6 }, () => Array(7).fill(0)),
      toggle: 1,
    };
  }

  resetGame(gameId) {
    if (this.games[gameId]) {
      this.games[gameId] = {
        players: [{ id: 1 }],
        board: Array.from({ length: 6 }, () => Array(7).fill(0)),
        toggle: 1,
      };
    }
  }

  move(gameId, column, playerId) {
    for (let i = 5; i >= 0; i--) {
      if (this.games[gameId].board[i][column] === 0) {
        this.games[gameId].board[i][column] = playerId;
        break;
      }
    }
    this.games[gameId].toggle = this.games[gameId].toggle === 1 ? 2 : 1;
  }

  verifyWin(playerId, gameId) {
    const winHor = checkHorizontalWin(playerId, this.games[gameId].board);
    const winVert = checkVerticalWin(playerId, this.games[gameId].board);
    if (winHor || winVert) {
      return true;
    }
    return false;
  }
}
