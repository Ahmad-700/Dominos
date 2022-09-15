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
  @Input() player!: Player;
  constructor(public main: MainService) { }

  play(card: Domino) {
    this.main.board.put(card, this.player);
  }

  playerIndex(): 0 | 1 | 2 | 3 {
    return this.main.board.players.indexOf(this.player) as (0 | 1 | 2 | 3);
  }

}
