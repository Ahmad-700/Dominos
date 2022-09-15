import { DotsNumber } from "../factory";
import Player from "./Player";

export class Domino {
  public inBoard: boolean = false;
  public firstCard: boolean = false;
  public isDouble!: boolean;
  public playedBy!: Player;
  constructor(public face:DotsNumber,public tail:DotsNumber) {
    this.isDouble = face == tail;
  }
}
