import { Component, Input, OnInit } from '@angular/core';
import Board from 'src/Classes/Board';
import { Domino } from 'src/Classes/Domino';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Input() board!:Board;
  constructor() { }

  ngOnInit(): void {
  }

  rotate180(c: Domino): boolean {

    let cards = [...this.board.getCards()]
    let indexOfFirstCard = cards.indexOf(cards.filter(v=>v.firstCard)[0])
    let faceCards = cards.filter((v, i) => i < indexOfFirstCard);
    let tailCards = cards.filter((v, i) => i > indexOfFirstCard);

    if (!c.firstCard && faceCards.includes(c)) {
      let prev = cards[cards.indexOf(c) + 1]
      if (c.tail != prev.face) {

        console.log(c,'should rotate\n','face:',c.face,'tail:',c.tail,'   prev> face:',prev.face,'tail:',prev.tail)
        return true;
      }
    }
    else if (!c.firstCard && tailCards.includes(c)) {
      let prev = cards[cards.indexOf(c) - 1];
      if (c.face != prev.tail) {
console.log(c,'should rotate\n','face:',c.face,'tail:',c.tail,'   prev> face:',prev.face,'tail:',prev.tail)
        return true;
      }
    }
    return false;
  }

}
