import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebSocketSubject } from 'rxjs/webSocket';
import { ConnectionService } from 'src/app/services/connection/connection.service';
import { ChessState } from 'src/app/services/objects/chess-state';
import { ConnectionState } from 'src/app/services/objects/connection-state';
import { Move } from 'src/app/services/objects/Move';
import { Piece } from 'src/app/services/objects/piece';

@Component({
  selector: 'app-watch-game',
  templateUrl: './watch-game.component.html',
  styleUrls: ['./watch-game.component.css']
})
export class WatchGameComponent implements OnInit {
  public id = '';
  public chessBoardState: ChessState = new ChessState();
  public connectionState: ConnectionState = ConnectionState.connecting;
  public curerntBoard: Piece[] = [];

  private connection: WebSocketSubject<Move>;

  constructor(
    private route: ActivatedRoute,
    private connectionService: ConnectionService,
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
    this.id = idParameter ? idParameter : '';
  }

  subscribeToData(): void {
    this.connection.subscribe({
      next: (move) => {
        this.chessBoardState.addMove(move);
        this.updateCurrentBoard();
        this.connectionState = ConnectionState.connected;
      },
      error: () => {
        this.connectionState = ConnectionState.failed;
      },
    });
  }

  async keepConnectionAlive(): Promise<void> {
    while (this.connectionState !== ConnectionState.failed) {
      const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
      await delay(5000);
      this.connection.next({
        pieceId: 1,
        from: 1,
        to: 1,
        color: false,
      });
    }
  }

  updateCurrentBoard(): void {
    this.curerntBoard = this.chessBoardState.getCurrentBoard();
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
