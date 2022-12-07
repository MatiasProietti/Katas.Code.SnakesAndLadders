import promptInitializer from "prompt-sync";
import { Board } from "./models/board";
import { Player } from "./models/player";
import { SquareType } from "./models/square";
const prompt = promptInitializer(); // This line doesn't follow best practices. This is intended to make the example simpler.

export class Game {
  private currentTurn = 0;
  private board: Board;
  private amountOfPlayers: number;
  private playersTurnQueue!: Player[];
  private _currentPlayerTurn!: Player;
  private _players: Player[];
  private _winner?: Player;

  constructor(amountOfPlayers: number) {
    this.amountOfPlayers = amountOfPlayers;
    this._players = this.createPlayers(amountOfPlayers);
    this.board = new Board();
  }

  public get getCurrentPlayerTurn(): Player {
    return this._currentPlayerTurn;
  }

  public get getPlayers(): Player[] {
    return this._players;
  }

  public get getWinner(): Player | undefined {
    return this._winner;
  }

  public start(): void {
    this.currentTurn = 0;
    this._winner = undefined;
    this.resetPlayersStartingPosition();
    console.log(
      `Game is starting now. Good luck & have fun.\nAll players will start at square 1.\nReach square ${this.board.size} to win!.\n`
    );

    this.startNewTurn();
  }

  public stop(): void {
    if (this._winner) console.log(`Player ${this._winner.id} reached square ${this.board.size} and won the game!`);
    else console.log(`Nobody won the game.`);

    console.log(`\nGame ended in ${this.currentTurn} turns.`);
  }

  public nextTurn(): void {
    let player = this.getNextPlayerInTurnQueue();

    if (!player) {
      this.startNewTurn();
      player = this.getNextPlayerInTurnQueue() as Player;
    }

    console.log(`\nIt's Player ${player.id} turn, he/she is at square ${player.getTokenPosition}.`);
    this._currentPlayerTurn = player;
  }

  public rollDiceAndMove(): void {
    const roll = this.rollDice();
    console.log(`Rolled ${roll}`);
    this.movePlayer(this._currentPlayerTurn, roll);
  }

  /**
   * @description Generates a random integer between 1 and 6
   * @private
   * @returns {*}  {number}
   */
  public rollDice(): number {
    return Math.floor(Math.random() * (6 - 1 + 1)) + 1;
  }

  private getNextPlayerInTurnQueue(): Player | undefined {
    return this.playersTurnQueue.shift();
  }

  private startNewTurn(): void {
    this.resetPlayersTurnQueue();
    this.currentTurn++;
    console.log(`\n================== Turn number ${this.currentTurn} ==================`);
  }

  private resetPlayersTurnQueue(): void {
    this.playersTurnQueue = [...this._players];
  }

  private resetPlayersStartingPosition(): void {
    this._players.forEach((player) => (player.setTokenPosition = 1));
  }

  private createPlayers(amountOfPlayers: number): Player[] {
    const players: Player[] = [];
    for (let index = 1; index <= amountOfPlayers; index++) {
      players.push(new Player(index, 0));
    }
    return players;
  }

  private didPlayerWin(player: Player): boolean {
    return player.getTokenPosition === this.board.size;
  }

  /**
   * @description Moves the player to a new position based on the roll number.
   * Checks for rule breaking moves such as moving past the board size.
   *
   * @private
   * @param {Player} player
   * @param {number} roll
   * @returns {*}  {void}
   */
  private movePlayer(player: Player, roll: number): void {
    const newPosition = roll + player.getTokenPosition;

    if (newPosition > this.board.size) {
      console.log(`Player ${player.id} tried to ${newPosition} and fell of the board. He/she is back at square ${player.getTokenPosition}`);
      return;
    }

    const square = this.board.findSquare(newPosition);

    if (!square) {
      console.error(`Something went wrong, couldn't find the square in position: ${newPosition}. `);
      return;
    }

    switch (square.type) {
      case SquareType.NORMAL:
        console.log(`Player ${player.id} moved to square ${square.position}`);
        break;
    }

    player.setTokenPosition = square.finalPosition;

    if (this.didPlayerWin(player)) {
      this._winner = player;
      return;
    }
  }
}
