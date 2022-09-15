import { MainService } from "src/app/main.service";
import { ALLOW_TEAM_HAVE_SAME_DOTS, DOMINOS, DotsNumber, MAXIMUM_REPEATED_DOTS, MAXIMUM_REPEATED_DOUBLES } from "src/factory";
import { Domino } from "./Domino";
import Player from "./Player";

export default class Functions {
  constructor() { }
  public static initializePlayers():Player[] {
    let players = [];
    players.push(new Player(0));
    players.push(new Player(1));
    players.push(new Player(2));
    players.push(new Player(3));
    return players;
  }
  /**
   *
   *
   * @returns shuffled cards with valid shuffling
   */
  public static shuffleCards(players:Player[]){
    let shuffleCards = [...DOMINOS].sort(this.random).sort(this.random)
    let d = [shuffleCards.splice(0, 7), shuffleCards.splice(0, 7), shuffleCards.splice(0, 7), shuffleCards.splice(0, 7)];
    players[0].cards = d[0];
    players[1].cards = d[1];
    players[2].cards = d[2];
    players[3].cards = d[3];
    if (this.invalidShuffling(players))
      this.shuffleCards(players);
  }

  /**
   *
   * @param dots dotsNumber i.g face or tail
   * @param cards cards to search in
   * @returns array of cards that contains dots. ex: (4, [(5,4),(3,3),(4,4)]) => [(5,4),(4,4)]
   */
  public static cardsWith(dots: DotsNumber, cards: Domino[]): Domino[] {
    let dn = this.dotsNumber(cards);
    let arr:Domino[] = [];
    for (let c of cards)
      if (c.face == dots || c.tail == dots)
        arr.push(c);
    return arr;
  }

  // public

  /**
 *
 * @param players
 * @returns if cards distributed in invalid way, e.g same card distributed between two team meet.
 */
  private static invalidShuffling(players: Player[]): boolean {
    for (let p of players)
      if (this.invalidPlayerCards(p.cards))
        return true;

    if (!ALLOW_TEAM_HAVE_SAME_DOTS)//prevent two players have same cards
      for (let i = 0; i < 2; i++)
        for (let d = 0; d <= 6; d++)
          if (7 <= this.cardsWith(d as DotsNumber, players[i].cards).length + this.cardsWith(d as DotsNumber, players[i + 2].cards).length) {
            console.log(players[i].cards,'and',players[i+2].cards,'has all numbers=',d)
            return true;
          }


    return false;
  }

  /**
   *
   * @param cards player hand
   * @returns if cards repeated a lot return false...
   */
  private static invalidPlayerCards(cards: Domino[]): boolean {
    let dn: DotsNumber[] = this.dotsNumber(cards);
    for (let i = 0; i < dn.length; i++) {//check repeated same dotsNumber
      if (this.cardsWith(dn[i], cards).length > MAXIMUM_REPEATED_DOTS)
        return true;
    }

    let doubleSum = 0;
    for (let c of cards)//check repeated doubles
      if (c.face == c.tail)
        doubleSum++;
    if (doubleSum > MAXIMUM_REPEATED_DOUBLES)
      return true;

    return false;
  }

  /**
  *
  * @returns array of dotsNumber for cards provided. DotsNumber of double card added once
  * ex: cards=[{face:5,tail:5},{face:4,tail:5}] => [5,4,5]
  */
  private static dotsNumber(cards: Domino[]): DotsNumber[] {
    let arr: DotsNumber[] = [];
    for (let c of cards) {
      if (c.face != c.tail)//add face and tail of double card once
        arr.push(c.face);
      arr.push(c.tail);
    }
    return arr
  }

  /**
   * Used in sort as param
   * @returns 1, 0 or -1 randomly
   */
  private static random() {
    return crypto.getRandomValues(new Int8Array(1))[0] > 0 ? 1 : (crypto.getRandomValues(new Int8Array(1))[0] < 0 ? -1 : 0)
  }

}




