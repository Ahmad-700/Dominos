import { Injectable } from '@angular/core';
import Board from 'src/Classes/Board';
import Player from 'src/Classes/Player';
import Functions from 'src/Classes/Functions';
@Injectable({
  providedIn: 'root'
})
export class MainService {
  public board: Board = new Board(Functions.initializePlayers());
  constructor() {
    this.startGame();
  }

  startGame() {
    // this.board.curPlayer = Functions.firstPlayer()

    // let test = this.players[3].cards[0];
    // let test1 = this.players[1].cards[1];
    // console.log('test', test);
    // this.board.put(test, this.players[3]);
    // this.board.put(test1, this.players[1]);
  }



}
