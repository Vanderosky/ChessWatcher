import { PipeCollector } from '@angular/compiler/src/template_parser/binding_parser';
import { ChessBoard } from './chess-board';
import { Move } from './Move';
import { Piece } from './piece';

export class ChessState {
  private gameBoards: Piece[][] = [];
  private moveCounter = 0;
  private movesHistory: Move[] = [];

    constructor() {
        this.gameBoards.push(this.getNewBoard());
    }

    getMoveCounter(): number {
        return this.moveCounter;
    }

    getGameBoards(): Piece[][] {
        return this.gameBoards;
    }

    getCurrentBoard(): Piece[] {
        return this.gameBoards[this.moveCounter];
    }

    moveBackwards(): void {
        if (this.moveCounter > 0) { this.moveCounter--; }
    }
    moveForward(): void {
        if (this.moveCounter < this.movesHistory.length) { this.moveCounter++; }
    }

    skipBackwards(): void {
        this.moveCounter = 0;
    }

    skipForward(): void {
        this.moveCounter = this.gameBoards.length - 1;
    }

    addMove(move: Move): void {
        this.movesHistory.push(move);
        const newBoard: Piece[] = [...this.gameBoards[this.moveCounter]];

        newBoard[move.to] = newBoard[move.from];
        newBoard[move.from] = this.getClearField();

        this.gameBoards.push(newBoard);
        if (this.moveCounter === this.movesHistory.length - 1)
        {
            this.moveForward();
        }
    }

    getClearField(): Piece {
        return {
            id: 0,
            color: false
        };
    }

    reverLastMove(): void {
        if (this.moveCounter > 0) {
            this.moveCounter--;
        }
        if (this.gameBoards) {
            this.gameBoards.pop();
        }
    }

    getNewBoard(): Piece[] {
        const chessBoard: Piece[] = [];
        const blackPieces: Piece[] = [
            {id: 2, color: false},
            {id: 2, color: false},
            {id: 4, color: false},
            {id: 5, color: false},
            {id: 6, color: false},
            {id: 2, color: false},
            {id: 3, color: false},
            {id: 2, color: false},

            {id: 1, color: false},
            {id: 1, color: false},
            {id: 1, color: false},
            {id: 1, color: false},
            {id: 1, color: false},
            {id: 1, color: false},
            {id: 1, color: false},
            {id: 1, color: false},
        ];
        const whitePieces: Piece[] = [
            {id: 1, color: true},
            {id: 1, color: true},
            {id: 1, color: true},
            {id: 1, color: true},
            {id: 1, color: true},
            {id: 1, color: true},
            {id: 1, color: true},
            {id: 1, color: true},

            {id: 2, color: true},
            {id: 2, color: true},
            {id: 4, color: true},
            {id: 5, color: true},
            {id: 6, color: true},
            {id: 2, color: true},
            {id: 3, color: true},
            {id: 2, color: true},
        ];
        chessBoard.push(...blackPieces);
        for (let i = 0; i < 32; i++){
            chessBoard.push({id: 0, color: false});
        }
        chessBoard.push(...whitePieces);

        return chessBoard;
    }
}
