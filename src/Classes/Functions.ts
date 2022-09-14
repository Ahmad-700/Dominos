import { MainService } from "src/app/main.service";
import { DOMINOS, DotsNumber, MAXIMUM_REPEATED_DOTS, MAXIMUM_REPEATED_DOUBLES } from "src/factory";
import { Domino } from "./Domino";
import Player from "./Player";

export default class Functions{
  constructor(){}
  public initializePlayers(main: MainService){
    main.players = [];
    main.players.push(new Player(0));
    main.players.push(new Player(1));
    main.players.push(new Player(2));
    main.players.push(new Player(3));
    return this;
  }
  /**
   *
   *
   * @returns shuffled cards with valid shuffling
   */
  public shuffleCards(main: MainService): any {
    let shuffleCards = [...DOMINOS].sort(this.random).sort(this.random)
    let d = [shuffleCards.splice(0, 7), shuffleCards.splice(0, 7), shuffleCards.splice(0, 7), shuffleCards.splice(0, 7)];
    main.players[0].cards = d[0];
    main.players[1].cards = d[1];
    main.players[2].cards = d[2];
    main.players[3].cards = d[3];
    if (this.invalidShuffling(main.players))
      this.shuffleCards(main);
    return this;
  }

  /**
   *
   * @param dots dotsNumber i.g face or tail
   * @param cards cards to search in
   * @returns how many dots contains in cards. ex: (4, [(5,4),(3,4),(4,4)]) => 3
   */
  public howMany(dots: DotsNumber,cards:Domino[]): number{
    let dn = this.dotsNumber(cards);
    let sum = 0;
    for (let d of dn)
      if (dots == d)
        sum++;
    return sum;
  }

  /**
 *
 * @param players
 * @returns if cards distributed in invalid way, e.g same card distributed between two team meet.
 */
 private invalidShuffling(players: Player[]): boolean {
  for (let p of players)
    if (this.invalidPlayerCards(p.cards))
      return true;
  //todo if two players has same card
  return false;
}

/**
 *
 * @param cards player hand
 * @returns if cards repeated a lot return false...
 */
private invalidPlayerCards(cards: Domino[]): boolean {
  let dn: DotsNumber[] = this.dotsNumber(cards);
  for (let i = 0; i < dn.length; i++) {//check repeated same dotsNumber
    if (this.howMany(dn[i],cards) > MAXIMUM_REPEATED_DOTS)
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
private dotsNumber(cards: Domino[]): DotsNumber[] {
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
private random() {
  return crypto.getRandomValues(new Int8Array(1))[0] > 0 ? 1 : (crypto.getRandomValues(new Int8Array(1))[0] < 0 ? -1 : 0)
}

}




