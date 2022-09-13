import { Component } from '@angular/core';
import Player from 'src/Classes/Player';
import { MainService } from './main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Domino-UI';
  constructor(public main: MainService) {

  }
}
