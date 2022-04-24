import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ChessState } from 'src/app/services/objects/chess-state';
import { Piece } from 'src/app/services/objects/piece';

@Component({
  selector: 'app-show-board',
  templateUrl: './show-board.component.html',
  styleUrls: ['./show-board.component.css'],
})
export class ShowBoardComponent implements OnInit, OnChanges {
  @Input() chessBoardState: ChessState = new ChessState();

  public currentBoard: Piece[] = [];

  constructor() {}

  ngOnInit(): void {
    this.currentBoard = this.chessBoardState.getCurrentBoard();
  }

  ngOnChanges(): void {
    this.currentBoard = this.chessBoardState.getCurrentBoard();
}

  public getPiece(piece: Piece): string {
    if (piece.color) {
      switch (piece.id) {
          case 1:
              return '♙';
          case 2:
              return '♖';
          case 3:
              return '♘';
          case 4:
              return '♗';
          case 5:
              return '♕';
          case 6:
              return '♔';
      }
    }
    switch (piece.id)
      {
          case 1:
              return '♟';
          case 2:
              return '♜';
          case 3:
              return '♞';
          case 4:
              return '♝';
          case 5:
              return '♛';
          case 6:
              return '♚';
          default:
              return '';
      }
    }
}
