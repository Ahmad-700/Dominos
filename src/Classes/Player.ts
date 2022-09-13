import Board from './Board';
import { Domino } from './Domino';

export default class Player {
  public cards: Domino[] = [];
  constructor(public num: 0|1 | 2 | 3) {
  }

  /**
   *
   * @param domino the domino the player have to be in the board
   */
  play(domino: Domino, board: Board) {
    console.assert(this.cards.includes(domino), 'Expected domino includes in player hand. Got=', this.cards.includes(domino), '. Player should play valid card in the board')


  }
}
