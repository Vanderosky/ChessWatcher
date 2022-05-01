import { Move } from './Move';
import { Piece } from './piece';

export class ChessState {
  private gameBoards: Piece[][] = [];
  private moveCounter = 0;
  private movesHistory: Move[] = [];
  private movesInNotation: string[] = [];
  private movesInNotationCount = 0;

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

  getMovesHistory(): Move[] {
    return this.movesHistory;
  }

  getMovesInNotation(): string[] {
    return this.movesInNotation;
  }

  getMovesInNotationCount(): number {
    return this.movesInNotationCount;
  }

  moveBackward(): void {
    if (this.moveCounter > 0) { this.moveCounter--; }
  }

  moveForward(): void {
    if (this.moveCounter < this.movesHistory.length) { this.moveCounter++; }
  }

  skipBackward(): void {
    this.moveCounter = 0;
  }

  skipForward(): void {
    this.moveCounter = this.gameBoards.length - 1;
  }

  addMove(move: Move): void {
    this.movesHistory.push(move);
    this.updateMovesInNotation();

    const newBoard: Piece[] = [...this.gameBoards[this.moveCounter]];

    newBoard[move.to] = newBoard[move.from];
    newBoard[move.from] = this.getClearField();

    this.gameBoards.push(newBoard);
    if (this.moveCounter === this.movesHistory.length - 1) {
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
      { id: 2, color: false },
      { id: 3, color: false },
      { id: 4, color: false },
      { id: 5, color: false },
      { id: 6, color: false },
      { id: 4, color: false },
      { id: 3, color: false },
      { id: 2, color: false },

      { id: 1, color: false },
      { id: 1, color: false },
      { id: 1, color: false },
      { id: 1, color: false },
      { id: 1, color: false },
      { id: 1, color: false },
      { id: 1, color: false },
      { id: 1, color: false },
    ];
    const whitePieces: Piece[] = [
      { id: 1, color: true },
      { id: 1, color: true },
      { id: 1, color: true },
      { id: 1, color: true },
      { id: 1, color: true },
      { id: 1, color: true },
      { id: 1, color: true },
      { id: 1, color: true },

      { id: 2, color: true },
      { id: 3, color: true },
      { id: 4, color: true },
      { id: 5, color: true },
      { id: 6, color: true },
      { id: 4, color: true },
      { id: 3, color: true },
      { id: 2, color: true },
    ];
    chessBoard.push(...blackPieces);
    for (let i = 0; i < 32; i++) {
      chessBoard.push({ id: 0, color: false });
    }
    chessBoard.push(...whitePieces);

    return chessBoard;
  }

  updateMovesInNotation(): void {
    if (this.movesInNotationCount > 0) {
      if (
        this.movesHistory[this.movesInNotationCount - 1].color ===
        this.movesHistory[this.movesInNotationCount].color
      ) {
        this.movesInNotation.splice(this.movesInNotation.length - 1, 1);
        this.movesInNotation.push(
          this.getMoveInNotation(this.movesHistory[this.movesInNotationCount], true)
        );
      } else {
        this.movesInNotation.push(
          this.getMoveInNotation(this.movesHistory[this.movesInNotationCount])
        );
      }
    } else {
      this.movesInNotation.push(
        this.getMoveInNotation(this.movesHistory[this.movesInNotationCount])
      );
    }
    this.movesInNotationCount++;
  }

  getMoveInNotation(move: Move, castle: boolean = false): string {
    let fieldName = '';
    if (castle) {
      fieldName += String.fromCharCode((move.to % 8) + 97);
      fieldName += (8 - move.to / 8).toString();
      if (castle) {
        if (move.color) {
          if (move.to < 4) {
            fieldName += ' O-O-O'; // kingside castle
            return fieldName;
          } else {
            fieldName += ' O-O'; // kingside castle
            return fieldName;
          }
        } else {
          if (move.to > 60) {
            fieldName += ' O-O'; // kingside castle
            return fieldName;
          } else {
            fieldName += ' O-O-O'; // kingside castle
            return fieldName;
          }
        }
      }
    }
    fieldName += this.getPieceName(move.piece);
    if (this.getCurrentBoard()[move.to].id !== 0) {
      // check if capture
      fieldName += String.fromCharCode((move.from % 8) + 97);
      fieldName += 'x';
    }
    fieldName += String.fromCharCode((move.to % 8) + 97);
    fieldName += (Math.ceil(8 - (move.to / 8))).toString();
    fieldName += ' ';
    return fieldName;
  }

  public getPieceName(pieceId: number): string {
    switch (pieceId) {
      case 0:
        return '';
      case 1:
        return ''; // pawn
      case 2:
        return 'R'; // rook
      case 3:
        return 'N'; // knight
      case 4:
        return 'B'; // bishop
      case 5:
        return 'Q'; // queen
      case 6:
        return 'K'; // king
    }
    return '';
  }
}
