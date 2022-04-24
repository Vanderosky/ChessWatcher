import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Move } from '../objects/Move';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  private gameId: string;
  private webSocket: WebSocketSubject<any>;

  constructor() {
    this.gameId = 'a';
    this.webSocket = webSocket('wss://sleepy-falls-41701.herokuapp.com/watch?id=' + this.gameId);
  }

  listenData(gameId: string): WebSocketSubject<Move> {
    return webSocket('wss://sleepy-falls-41701.herokuapp.com/watch?id=' + gameId);
  }

}
