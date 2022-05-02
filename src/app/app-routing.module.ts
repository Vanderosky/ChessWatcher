import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameFinderComponent } from './components/game-finder/game-finder/game-finder.component';
import { ViewAiComponent } from './components/view-ai/view-ai.component';
import { WatchGameComponent } from './components/watch-game/watch-game.component';

const routes: Routes = [
  { path: 'watch/:id', component: WatchGameComponent},
  { path: 'ai/:id', component: ViewAiComponent},
  { path: 'find', component: GameFinderComponent},
  { path: '', component: GameFinderComponent},
  { path: '**', component: GameFinderComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
