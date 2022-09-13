import { Domino } from './Classes/Domino';
import Player from './Classes/Player';
export type Players = [Player, Player, Player, Player];
export type DotsNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export const DOMINOS = [new Domino(0,0),new Domino(0,1),new Domino(0,2),new Domino(0,3),new Domino(0,4),new Domino(0,5),new Domino(0,6),new Domino(1,1),new Domino(1,2),new Domino(1,3),new Domino(1,4),new Domino(1,5),new Domino(1,6),new Domino(2,2),new Domino(2,3),new Domino(2,4),new Domino(2,5),new Domino(2,6),new Domino(3,3),new Domino(3,4),new Domino(3,5),new Domino(3,6),new Domino(4,4),new Domino(4,5),new Domino(4,6),new Domino(5,5),new Domino(5,6),new Domino(6,6)];
//datatype FaceTail is 0:0, 0:1,... ,6:6.
//datatype Domino is faceTail with more information like isInBoard and if so how play it.
//datatype Board has array of played dominos in ordered way like: ['4:6', '6:6', '5:6'] that means it look like  0:6|6:6|6:5 so board in this state will has face=0 and tail=5.
//players are bottom is 0, right is 1 front is 2 left is 3
