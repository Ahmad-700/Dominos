import { PlayerHand,validPlay,Card } from '../factory';

export default class Player {
   
   constructor(private cards:PlayerHand ) {
      console.assert(cards.length === 7,'Expected 7. Got=',cards.length,'. Player should initialize with 7 cards.')
   }
   
   /**
    * 
    * @param card the card the player have to be in the board
    */
   play(card:Card) {
      console.assert(this.cards.includes(card),'Expected card includes in player hand. Got=',this.cards.includes(card),'. Player should play valid card in the board')
      
   }
}