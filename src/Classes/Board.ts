import { DotsNumber } from "../factory";
import { Domino } from "./Domino";
import Functions from "./Functions";
import Player from "./Player";

export default class Board {
  public face!: DotsNumber;
  public tail!: DotsNumber;
  public curPlayer: Player|null = null;
  private cards: Domino[];
  public getCards(): readonly Domino[] {
    return this.cards;
  }
  constructor(public players:Player[]) {
    this.cards = [];
  }

  /**
   *
   * @param domino card
   * @param player how play the card
   * @param isFace is played in the face of board or tail. If undefined then will played in the one only possible side other wise throw error
   * @returns
   */
  public put(domino: Domino, player: Player, isFace?: boolean): boolean {

    if (!player.cards.includes(domino)) {
      console.assert(false, 'Play with your own cards; Expected player=', player, ' has card=', domino, '. Got false')
      return false;
    }
    if (this.curPlayer != null && this.curPlayer != player) {
      console.assert(false, 'Not your turn; Expected player=', this.curPlayer, ' to play. Got player=', player.num);
      return false;
    }
    if (this.curPlayer == null && !this.isIncludeDoubleSix(player.cards)) {
      console.assert(false, 'First Player should have double six; Expected player\'s cards=', player.cards, 'includes double six. Got isIncludeDoubleSix=', this.isIncludeDoubleSix(player.cards))
      return false;
    }
    if (this.curPlayer == null && (domino.face != 6 || domino.tail != 6) && Functions.cardsWith(6, player.cards).length > 2) {
      console.assert(false, 'You can\'t play other than double six, because you have other dots six cards; Expected (6,6) card. Got=', domino);
      return false;
    }

    //first time; board is empty
    if (this.cards.length == 0) {

      this.played(player, domino);
      domino.firstCard = true;
      this.cards.push(domino);
      this.face = domino.face;
      this.tail = domino.tail;
      return true;
    }

    //check card have valid position in board
    if (isFace != undefined) {
      if (isFace == true && domino.face != this.face && domino.tail != this.face) {
        console.assert(false, 'Invalid params in put function. isFace == ', isFace, ' but domino can\'t be in face. domino=', domino)
        return false;
      }
      else if (isFace == false && domino.face != this.tail && domino.tail != this.tail) {
        console.assert(false, 'Invalid params in put function. isFace == ', isFace, ' but domino can\'t be in tail. domino=', domino)
        return false;
      }
    } else {
      if ((domino.face == this.face && domino.tail == this.tail) ||
        (domino.face == this.tail && domino.tail == this.face)) {
        console.assert(false, 'Invalid params in put function. Domino provided can be played in either side and isFace=', isFace, '. domino=', domino);
        return false;
      }
    }

    if ((isFace == true || isFace == undefined) && (domino.face == this.face || domino.tail == this.face)) {
      this.cards.splice(0, 0, domino);
      this.face = domino.face == this.face ? domino.tail : domino.face;
    } else if ((isFace == false || isFace == undefined) && (domino.face == this.tail || domino.tail == this.tail)) {
      this.cards.push(domino);
      this.tail = domino.face == this.tail ? domino.tail : domino.face;
    } else {
      console.error('can\'t put domino=', domino, ' in board with face=' + this.face + ' and tail=' + this.tail);
      return false;
    }

    this.played(player, domino);
    return true;
  }


  /**
   * routine stuff when player play a card. ex: next player turn, card is inBoard...etc
   * @param player
   * @param card
   */
  private played(player: Player, card: Domino):void {
    card.inBoard = true;
    card.playedBy = player;
    player.cards.splice(player.cards.indexOf(card), 1);
    this.curPlayer = this.players[(this.players.indexOf(player) + 1) % 4 as (0 | 1 | 2 | 3)];
  }

  /**
   * return
   */
  private nextPlayer(): Player{
    console.assert(this.curPlayer!=null,'nextPlayer called while current player is undefined; Expected curPlayer!=null. Got=',this.curPlayer)
    return this.players[(this.players.indexOf(this.curPlayer as Player)+1)%4 as (0|1|2|3)]
  }

  private isIncludeDoubleSix(cards: Domino[]): boolean {
    for (let c of cards)
      if (c.face == 6 && c.tail == 6)
        return true;
    return false;
  }

}
