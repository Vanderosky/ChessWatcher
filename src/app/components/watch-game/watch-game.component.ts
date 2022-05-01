import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebSocketSubject } from 'rxjs/webSocket';
import { ConnectionService } from 'src/app/services/connection/connection.service';
import { GameIdService } from 'src/app/services/game-id/game-id.service';
import { ChessState } from 'src/app/services/objects/chess-state';
import { ConnectionState } from 'src/app/services/objects/connection-state';
import { Move } from 'src/app/services/objects/Move';
import { Piece } from 'src/app/services/objects/piece';

@Component({
  selector: 'app-watch-game',
  templateUrl: './watch-game.component.html',
  styleUrls: ['./watch-game.component.css'],
})
export class WatchGameComponent implements OnInit {
  public id = '';
  public chessBoardState: ChessState = new ChessState();
  public connectionState: ConnectionState = ConnectionState.connecting;
  public curerntBoard: Piece[] = [];
  public movesInNotation: string[] = [];
  public latestUpdate: Date = new Date();

  private connection: WebSocketSubject<Move>;

  constructor(
    private route: ActivatedRoute,
    private connectionService: ConnectionService,
    private gameIdService: GameIdService,
  ) {
    this.getRouteParameter();
    this.connection = this.connectionService.listenData(this.id);
  }

  ngOnInit(): void {
    this.subscribeToData();
    this.keepConnectionAlive();
    this.updateCurrentBoard();
  }

  getRouteParameter(): void {
    const idParameter = this.route.snapshot.params.id;
    this.id = idParameter;
    this.gameIdService.setGameId(this.id);
  }

  subscribeToData(): void {
    this.connection.subscribe({
      next: (move: Move) => {
        this.update(move);
      },
      error: () => {
        this.connectionState = ConnectionState.failed;
      },
    });
  }

  update(move: Move): void {
    this.chessBoardState.addMove(move);
    this.updateCurrentBoard();
    this.connectionState = ConnectionState.connected;
    this.latestUpdate = new Date();
  }

  async keepConnectionAlive(): Promise<void> {
    while (this.connectionState !== ConnectionState.failed) {
      const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
      await delay(5000);
      this.connection.next({
        piece: 1,
        from: 1,
        to: 1,
        color: false,
      });
    }
  }

  updateCurrentBoard(): void {
    this.curerntBoard = [...this.chessBoardState.getCurrentBoard()];
    this.movesInNotation = [...this.chessBoardState.getMovesInNotation()];
  }

  skipBackward(): void {
    this.chessBoardState.skipBackward();
    this.updateCurrentBoard();
  }

  moveBackward(): void {
    this.chessBoardState.moveBackward();
    this.updateCurrentBoard();
  }

  moveForward(): void {
    this.chessBoardState.moveForward();
    this.updateCurrentBoard();
  }

  skipForward(): void {
    this.chessBoardState.skipForward();
    this.updateCurrentBoard();
  }
}
