import "jest";
import { Game } from "../../game";
import { Player } from "../../models/player";

describe("US 1 - Token Can Move Across the Board", () => {
  let gameInstance: Game;

  beforeEach(() => {
    gameInstance = new Game(2);
    gameInstance.start();
  });

  it("UAT1: places the token on square 1 when the game starts", () => {
    gameInstance.getPlayers.forEach((player: Player) => {
      expect(player.getTokenPosition).toBe(1);
    });
  });

  it("UAT2: moves the token to square 4 when the token starts on square 1 and is moved 3 spaces", () => {
    gameInstance.nextTurn();
    const player = gameInstance.getCurrentPlayerTurn;
    const forcedRoll = 3;
    jest.spyOn(gameInstance, "rollDice").mockReturnValueOnce(forcedRoll);

    gameInstance.rollDiceAndMove();
    expect(player.getTokenPosition).toBe(4);
  });

  it("UAT3: moves the token to square 8 when the token starts on square 1 and is moved 3 + 4 spaces", () => {
    gameInstance.nextTurn();
    const player = gameInstance.getCurrentPlayerTurn;
    let forcedRoll = 3;
    jest.spyOn(gameInstance, "rollDice").mockReturnValueOnce(forcedRoll);

    gameInstance.rollDiceAndMove();

    forcedRoll = 4;
    jest.spyOn(gameInstance, "rollDice").mockReturnValueOnce(forcedRoll);

    gameInstance.rollDiceAndMove();
    expect(player.getTokenPosition).toBe(8);
  });
});

describe("US 2 - Player Can Win the Game", () => {
  let gameInstance: Game;
  let player: Player;

  beforeEach(() => {
    gameInstance = new Game(1);
    gameInstance.start();
    gameInstance.nextTurn();
    player = gameInstance.getCurrentPlayerTurn;
  });

  it("UAT1: the player is on square 100 and wins the game when the token is on square 97 and moved 3 spaces", () => {
    player.setTokenPosition = 97;
    const forcedRoll = 3;
    jest.spyOn(gameInstance, "rollDice").mockReturnValueOnce(forcedRoll);

    gameInstance.rollDiceAndMove();
    expect(player.getTokenPosition).toBe(100);
    expect(gameInstance.getWinner).toBe(player);
  });

  it("UAT2: the player is on square 97 and did not win the game when the token is on square 97 and moved 4 spaces", () => {
    player.setTokenPosition = 97;
    const forcedRoll = 4;
    jest.spyOn(gameInstance, "rollDice").mockReturnValueOnce(forcedRoll);

    gameInstance.rollDiceAndMove();

    expect(player.getTokenPosition).toBe(97);
    expect(gameInstance.getWinner).not.toBe(player);
  });
});

describe("US 3 - Moves Are Determined By Dice Rolls", () => {
  let gameInstance: Game;

  beforeEach(() => {
    gameInstance = new Game(1);
    gameInstance.start();
  });

  it("UAT1: returns an integer between 1 and 6 when rolling a die", () => {
    const roll = gameInstance.rollDice();

    expect(roll).toBeGreaterThanOrEqual(1);
    expect(roll).toBeLessThanOrEqual(6);
  });

  it("UAT2: the player moves 4 spaces when the player rolls a 4", () => {
    gameInstance.nextTurn();
    const player = gameInstance.getCurrentPlayerTurn;

    const startingPosition = player.getTokenPosition;
    const forcedRoll = 4;

    jest.spyOn(gameInstance, "rollDice").mockReturnValueOnce(forcedRoll);

    gameInstance.rollDiceAndMove();

    expect(player.getTokenPosition).toBe(startingPosition + forcedRoll);
  });
});
