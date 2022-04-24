import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnectionService } from 'src/app/services/connection/connection.service';
import { ChessState } from 'src/app/services/objects/chess-state';
import { ConnectionState } from 'src/app/services/objects/connection-state';

@Component({
  selector: 'app-watch-game',
  templateUrl: './watch-game.component.html',
  styleUrls: ['./watch-game.component.css']
})
export class WatchGameComponent implements OnInit {
  public id = '';
  public chessBoardState: ChessState = new ChessState();
  public connectionState: ConnectionState = ConnectionState.connecting;

  constructor(
    private route: ActivatedRoute,
    private connectionService: ConnectionService,
  ) {}

  ngOnInit(): void {
    this.getRouteParameter();
    this.subscribeToData();
  }

  getRouteParameter(): void {
    const idParameter = this.route.snapshot.params.id;
    this.id = idParameter ? idParameter : '';
  }

  subscribeToData(): void {
    this.connectionService.listenData(this.id).subscribe({
      next: (move) => {
        this.chessBoardState.addMove(move);
        this.connectionState = ConnectionState.connected;
        // console.log(move);
        // console.log(this.gameBoards.getGameBoards());
      },
      error: () => {
        this.connectionState = ConnectionState.failed;
      },
    });
  }

}
