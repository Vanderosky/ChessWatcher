import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PieceAI } from '../objects/piece-ai';

@Injectable({
  providedIn: 'root'
})
export class AiDataService {
  private apiUrl = 'https://chess-watcher.herokuapp.com/watch?id=';

  constructor(private http: HttpClient) { }

  fetchReposByUserName(gameId: string): Observable<PieceAI[]> {
    return this.http
      .get<PieceAI[]>(this.apiUrl + gameId)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
    );
  }
}
