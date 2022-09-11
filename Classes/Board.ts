import { Card,Num } from "../factory";

export default class Board{
   public face: number;
   public tail: number;
   private _cards: Card[];
   public get cards() {
      return Object.freeze(this._cards);
   }
   //fuck I need to make difference in how card look like '0:1' is not like '1:0' in the board. Or is it?
   put(card: Card,alone:Num) {
      let [face, tail] = card.split(':').map(v => Number(v));
      if(face == this.face && tail == this.tail)
   }
}