import { DotsNumber } from "../factory";
import Player from "./Player";

export class Domino {
  public inBoard: boolean = false;
  public firstCard: boolean = false;
  public isDouble!: boolean;
  public playedBy!: Player;
  public rotate: boolean = false;// if should rotate card 180deg in board
  constructor(public face:DotsNumber,public tail:DotsNumber) {
    this.isDouble = face == tail;
  }
}
