import { PlayerHand,Players,CARDS,Card} from './factory'
import Player from './Classes/Player';
import Board from './Classes/Board';




var board: Board = new Board();
var players: Players = startGame(board);
console.log(players);
/**
 * give all players random 7 cards
 */
function startGame(board:Board):Players {
   
   let shuffleCards = CARDS.sort(() => Math.random() - 0.5);
   
   let p = [shuffleCards.splice(0, 7), shuffleCards.splice(0, 7), shuffleCards.splice(0, 7), shuffleCards.splice(0, 7)];
   return [new Player(p[0] as PlayerHand), new Player(p[1] as PlayerHand), new Player(p[2] as PlayerHand), new Player(p[3] as PlayerHand)];
}




function distribution(players: Card[][]) {

}