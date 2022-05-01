import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameIdService } from 'src/app/services/game-id/game-id.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  public gameId = '';

  constructor(
    private router: Router,
    private gameIdService: GameIdService,
  ) { }

  ngOnInit(): void {
    this.gameIdService.currentGameId.subscribe(gameId => (this.gameId = gameId));
  }

  goTo(view: string): void {
    if (view === 'find') {
      this.router.navigateByUrl('/find');
    }
    if (view === 'watch') {
      this.router.navigateByUrl('/watch/' + this.gameId);
    }
    if (view === 'ai') {
      this.router.navigateByUrl('/ai/' + this.gameId);
    }
  }

}
