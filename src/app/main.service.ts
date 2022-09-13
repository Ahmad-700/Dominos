import { Injectable } from '@angular/core';
import Board from 'src/Classes/Board';
import Player from 'src/Classes/Player';
import { DOMINOS } from 'src/factory';
@Injectable({
  providedIn: 'root'
})
export class MainService  {
  public board: Board = new Board();
  public players!: Player[];
  constructor() {
    this.startGame();
  }

  startGame() {
    this.players = [];
    this.players.push(new Player(0));
    this.players.push(new Player(1));
    this.players.push(new Player(2));
    this.players.push(new Player(3));
    let shuffleCards = DOMINOS.sort(() => Math.random() - 0.5);
    let d = [shuffleCards.splice(0, 7), shuffleCards.splice(0, 7), shuffleCards.splice(0, 7), shuffleCards.splice(0, 7)];
    this.players[0].cards = d[0]
    this.players[1].cards = d[1]
    this.players[2].cards = d[2]
    this.players[3].cards = d[3]

    
  }





}
