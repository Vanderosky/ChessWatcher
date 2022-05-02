import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Move } from '../objects/Move';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  constructor() { }

  listenData(gameId: string): WebSocketSubject<Move> {
    return webSocket('wss://chess-watcher.herokuapp.com/watch?id=' + gameId);
  }
}
