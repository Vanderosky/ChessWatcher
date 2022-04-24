import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameFinderComponent } from './components/game-finder/game-finder/game-finder.component';
import { LoginComponent } from './components/login/login.component';
import { WatchGameComponent } from './components/watch-game/watch-game.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'watch', component: WatchGameComponent},
  { path: 'watch/:id', component: WatchGameComponent},
  { path: '', component: GameFinderComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
