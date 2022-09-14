import { Domino } from './Domino';

export default class Player {
  public cards: Domino[] = [];
  constructor(public num: 0|1 | 2 | 3) {
  }
}
