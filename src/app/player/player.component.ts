import { Component, Input, OnInit } from '@angular/core';
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


}
