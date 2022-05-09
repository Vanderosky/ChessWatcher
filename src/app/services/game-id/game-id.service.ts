import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GameIdService {
  private gameId = '';
  public subject = new Subject<string>();
  private gameIdSource = new BehaviorSubject(this.gameId);
  public currentGameId = this.gameIdSource.asObservable();

  constructor() {
    this.gameId = '';
  }

  getGameId(): string {
    return this.gameId;
  }

  setGameId(gameId: string): void {
    this.gameIdSource.next(gameId);
  }
}
