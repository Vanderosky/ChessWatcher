import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AiDataService } from 'src/app/services/ai-data/ai-data.service';
import { GameIdService } from 'src/app/services/game-id/game-id.service';
import { ChessState } from 'src/app/services/objects/chess-state';
import { PieceAI } from 'src/app/services/objects/piece-ai';

@Component({
  selector: 'app-view-ai',
  templateUrl: './view-ai.component.html',
  styleUrls: ['./view-ai.component.css']
})
export class ViewAiComponent implements OnInit {
  public gameId = '';
  public aiData: PieceAI[] = [];
  public error = 0;
  public chessState: ChessState = new ChessState();

  constructor(
    private route: ActivatedRoute,
    private aiDataService: AiDataService,
    private gameIdService: GameIdService,
  ) {}

  ngOnInit(): void {
    this.getRouteParameter();
    this.getAiData();
  }

  getRouteParameter(): void {
    const idParameter = this.route.snapshot.params.id;
    this.gameId = idParameter ? idParameter : '';
    this.gameIdService.setGameId(this.gameId);
  }

  getAiData(): void{
    this.aiDataService.fetchReposByUserName(this.gameId).subscribe({
      next: (response) => {
        this.aiData = response;
        console.log(response);
      },
      error: (error) => {
        this.error = error;
        console.log(error);
      },
      complete: () => {}
    })
  }

  GetPiece(piece: PieceAI): string
  {
      switch (piece.piece)
      {
          case "Black-Pawn":
              return "♟";
          case "Black-Rook":
              return "♜";
          case "Black-Knight":
              return "♞";
          case "Black-Bishop":
              return "♝";
          case "Black-Queen":
              return "♛";
          case "Black-King":
              return "♚";

          case "White-Pawn":
              return "♙";
          case "White-Rook":
              return "♖";
          case "White-Knight":
              return "♘";
          case "White-Bishop":
              return "♗";
          case "White-Queen":
              return "♕";
          case "White-King":
              return "♔";
          default:
              return "";
      }
  }


}
