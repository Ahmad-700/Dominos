import { FaceTail,Num } from "../factory";
import { Domino } from "./Card";

export default class Board{
   public face: number;
   public tail: number;
   private _dominos: Domino[];
   public get cards() {
      return Object.freeze(this._dominos);
   }
   //fuck I need to make difference in how card look like '0:1' is not like '1:0' in the board. Or is it?
   put(card: Card) {
      let [face, tail] = card.split(':').map(v => Number(v));
      if(face == this.face && tail == this.tail)
   }
}