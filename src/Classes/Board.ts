import { DotsNumber } from "../factory";
import { Domino } from "./Domino";
import Functions from "./Functions";
import Player from "./Player";

export default class Board {
  public face: DotsNumber | null = null;
  public tail: DotsNumber | null = null;
  public curPlayer: Player;
  private cards: Domino[];
  public getCards(): readonly Domino[] {
    return this.cards;
  }
  constructor(public players: Player[]) {
    this.cards = [];
    Functions.shuffleCards(this.players);
    this.curPlayer = Functions.firstPlayer(this.players);
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
      console.assert(false, 'Not your turn; Expected player=', this.curPlayer, ' to play. Got player=', player);
      return false;
    }

    if (this.cards.length == 0 && (domino.face != 6 || domino.tail != 6) && Functions.cardsWith(6, player.cards).length > 1) {
      console.assert(false, 'You can\'t play other than double six, because you have other dots six cards; Expected (6,6) card. Got=', domino);
      return false;
    }

    //first time; board is empty
    if (this.cards.length == 0) {

      domino.firstCard = true;
      this.cards.push(domino);
      this.face = domino.face;
      this.tail = domino.tail;
      this.played(player, domino);
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
  private played(player: Player, card: Domino): void {
    card.inBoard = true;
    card.playedBy = player;
    player.cards.splice(player.cards.indexOf(card), 1);
    this.curPlayer = this.players[(this.players.indexOf(player) + 1) % 4 as (0 | 1 | 2 | 3)]
    //todo create gameOver because if gameOver while-loop will be infinite loop!
    if (this.face && this.tail)//if next player can't play(pass) move to the next player until can play
      while (Functions.isPass(this.curPlayer.cards, this.face, this.tail))
        this.curPlayer = this.nextPlayer();

    //set rotation of card
    if (card.isDouble)
      return;
    if (card.firstCard)
      return;
    let indexOfFirstCard = this.cards.indexOf(this.cards.filter(v => v.firstCard)[0])
    let inFaceCards = this.cards.filter((v, i) => i < indexOfFirstCard).includes(card);
    let inTailCards = this.cards.filter((v, i) => i > indexOfFirstCard).includes(card);

    if (inFaceCards) {
      let prev = this.cards[this.cards.indexOf(card) + 1]
      if (card.tail != (prev.rotate?prev.tail:prev.face)) {
        console.log(card, 'rotate\n', 'face:', card.face, 'tail:', card.tail, '   prev> face:', prev.face, 'tail:', prev.tail)
        card.rotate = true;
      }
    }
    else if (inTailCards) {
      let prev = this.cards[this.cards.indexOf(card) - 1];
      if (card.face != (prev.rotate?prev.face:prev.tail)) {
        console.log(card, 'rotate\n', 'face:', card.face, 'tail:', card.tail, '   prev> face:', prev.face, 'tail:', prev.tail)
        card.rotate = true;
      }
    }

  }


  /**
   * return player after curPlayer
   */
  private nextPlayer(): Player {
    console.assert(this.curPlayer != null, 'nextPlayer called while current player is undefined; Expected curPlayer!=null. Got=', this.curPlayer)
    return this.players[(this.players.indexOf(this.curPlayer as Player) + 1) % 4 as (0 | 1 | 2 | 3)]
  }

  /**
   * return player after curPlayer
   */
  private prevPlayer(): Player {
    console.assert(this.curPlayer != null, 'prevPlayer called while current player is undefined; Expected curPlayer!=null. Got=', this.curPlayer)
    return this.players[(this.players.indexOf(this.curPlayer as Player) + 3) % 4 as (0 | 1 | 2 | 3)]
  }



}
