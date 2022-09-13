import { DotsNumber } from "../factory";
import { Domino } from "./Domino";

export default class Board {
  public face!: DotsNumber;
  public tail!: DotsNumber;
  private _dominos: Domino[] = [];
  public get dominos() {
    return Object.freeze(this._dominos);
  }

  put(domino: Domino, isFace?: boolean) {

  }


}
