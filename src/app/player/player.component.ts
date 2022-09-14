import { Component, Input, OnInit } from '@angular/core';
import { Domino } from 'src/Classes/Domino';
import Player from 'src/Classes/Player';
import { MainService } from '../main.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {
  constructor(public main: MainService) { }
  @Input() player!: Player;

  play(card: Domino) {
    this.main.board.put(card,this.player)
    console.log('board.cards=',this.main.board.getCards())
  }

}
