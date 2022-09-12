import Player from './Classes/Player';
export type FaceTail = '0:0' | '0:1' | '0:2' | '0:3' | '0:4' | '0:5' | '0:6' | '1:1' | '1:2' | '1:3' | '1:4' | '1:5' | '1:6' | '2:2' | '2:3' | '2:4' | '2:5' | '2:6' | '3:3' | '3:4' | '3:5' | '3:6' | '4:4' | '4:5' | '4:6' | '5:5' | '5:6' | '6:6';
export type Players = [Player, Player, Player, Player];
export type PlayerHand = [FaceTail?, FaceTail?, FaceTail?, FaceTail?, FaceTail?, FaceTail?, FaceTail?];
export type Num = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export const DOMINOS: [FaceTail, FaceTail, FaceTail, FaceTail, FaceTail, FaceTail, FaceTail, FaceTail, FaceTail, FaceTail, FaceTail, FaceTail, FaceTail, FaceTail, FaceTail, FaceTail, FaceTail, FaceTail, FaceTail, FaceTail, FaceTail, FaceTail, FaceTail, FaceTail, FaceTail, FaceTail, FaceTail, FaceTail] = ['0:0', '0:1', '0:2', '0:3', '0:4', '0:5', '0:6', '1:1', '1:2', '1:3', '1:4', '1:5', '1:6', '2:2', '2:3', '2:4', '2:5', '2:6', '3:3', '3:4', '3:5', '3:6', '4:4', '4:5', '4:6', '5:5', '5:6', '6:6'];

//datatype FaceTail is 0:0, 0:1,... ,6:6.
//datatype Domino is faceTail with more information like isInBoard and if so how play it.
//datatype Board has array of played dominos in ordered way like: ['4:6', '6:6', '5:6'] that means it look like  0:6|6:6|6:5 so board in this state will has face=0 and tail=5.
//players are bottom is 0, right is 1 front is 2 left is 3