import { Square, SquareType } from "./square";

export class Board {
  public readonly squares: Square[];
  public readonly size = 100;

  constructor() {
    this.squares = this.generateSquares();
  }

  public findSquare(position: number): Square | undefined {
    return this.squares.find((square) => square.position === position);
  }

  private generateSquares(): Square[] {
    const specialSquares: Square[] = [];

    const squares: Square[] = [];
    for (let squarePosition = 1; squarePosition <= this.size; squarePosition++) {
      const specialSquare = specialSquares.find((specialSquare) => specialSquare.position === squarePosition);
      squares.push(specialSquare ?? new Square(squarePosition, SquareType.NORMAL));
    }

    return squares;
  }
}
