export class Player {
  public readonly id: number;
  private _tokenPosition: number;

  constructor(id: number, tokenPosition: number) {
    this.id = id;
    this._tokenPosition = tokenPosition;
  }

  public set setTokenPosition(position: number) {
    this._tokenPosition = position;
  }

  public get getTokenPosition(): number {
    return this._tokenPosition;
  }
}
