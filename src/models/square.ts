export enum SquareType {
  NORMAL,
  LADDER,
  SNAKE,
}
export class Square {
  public readonly position: number;
  public readonly type: SquareType;
  public readonly finalPosition: number;

  constructor(position: number, type: SquareType, finalPosition?: number) {
    this.position = position;
    this.finalPosition = finalPosition ?? position;
    this.type = type;
  }
}
