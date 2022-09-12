import { PlayerHand, Card } from '../factory';
import Board from './Board';

export default class Player {
   
   constructor(private cards: PlayerHand,public playerName:1|2|3) {
      console.assert(cards.length === 7, 'Expected 7. Got=', cards.length, '. Player should initialize with 7 cards.')
   }

   /**
    * 
    * @param card the card the player have to be in the board
    */
   play(card: Card, board: Board) {
      console.assert(this.cards.includes(card), 'Expected card includes in player hand. Got=', this.cards.includes(card), '. Player should play valid card in the board')
      let [face, tail] = card.split(':');
      
      if (board.cards.length === 0)
         board.put(card);
         else if(face !==)
         this.cards.splice(this.cards.indexOf(card), 1);
   }
}