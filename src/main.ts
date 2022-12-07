import promptInitializer from "prompt-sync";
import { Game } from "./game";
const prompt = promptInitializer(); // This line doesn't follow best practices. This is intended to make the example simpler.

/*
  This file runs the game. This could be replaced by a frontend with a UI.

  We omit some checks to make it simpler.
  For example: we don't check if the game started before we do nextTurn(), stop() or rollDiceAndMove()
*/

const amountOfPlayers = Number(prompt(`How many players are going to play? `, "\n"));

if (amountOfPlayers < 1) {
  console.error("Invalid amount of players");
} else {
  const game = new Game(amountOfPlayers);

  game.start();

  while (!game.getWinner) {
    game.nextTurn();
    prompt(`Please press ENTER to roll the dice and move`);
    game.rollDiceAndMove();
  }

  game.stop();
}
