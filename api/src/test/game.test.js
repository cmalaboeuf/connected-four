import {
  ConnectedFour, checkHorizontalWin, checkVerticalWin, checkDiagonalWin,
} from '../game';

describe('#Game', () => {
  describe('checkHorizontalWin', () => {
    it('Should call checkHorizontalWin and return true when 4 cases are fill', () => {
      const board = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 0, 0, 0],
      ];
      const result = checkHorizontalWin(1, board);

      expect(result).toBe(true);
    });

    it('Should call checkHorizontalWin and return false when 4 cases are fill but non consecutively', () => {
      const board = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 0, 1, 0, 0],
      ];
      const result = checkHorizontalWin(1, board);

      expect(result).toBe(false);
    });
  });

  describe('checkVertical', () => {
    it('Should call checkVerticalWin and return true when 4 cases are fill', () => {
      const board = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0],
      ];
      const result = checkVerticalWin(1, board);

      expect(result).toBe(true);
    });

    it('Should call checkVerticalWin and return false when 4 cases are fill but non consecutively', () => {
      const board = [
        [0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0],
      ];
      const result = checkVerticalWin(1, board);

      expect(result).toBe(false);
    });
  });

  describe('createGame', () => {
    it('Should create a game', () => {
      const connectedFour = new ConnectedFour();
      const gameName = 'test';

      connectedFour.createGame(gameName);

      console.log(connectedFour.games);
      expect(connectedFour.games[gameName]).toBeTruthy();
    });
  });

  describe('resetGame', () => {
    it('Should reset a game', () => {
      const connectedFour = new ConnectedFour();
      const gameName = 'test';

      connectedFour.createGame(gameName);
      connectedFour.resetGame(gameName);

      expect(connectedFour.games[gameName].board).toEqual(
        Array.from({ length: 6 }, () => Array(7).fill(0)),
      );
    });
  });

  describe('move', () => {
    it('Should make a move for a player', () => {
      const connectedFour = new ConnectedFour();
      const gameName = 'test';

      connectedFour.createGame(gameName);

      expect(connectedFour.games[gameName].board).toEqual(
        Array.from({ length: 6 }, () => Array(7).fill(0)),
      );
    });
  });
});
