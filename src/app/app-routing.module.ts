import {
  NgModule
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  PokeComponent
} from './poke/poke.component';
import {
  ListComponent
} from './list/list.component';
import {
  NavbarComponent
} from './navbar/navbar.component';
import { GamesComponent } from './games/games.component';
import { GameslistComponent } from './games/gameslist/gameslist.component';
import { MovelistComponent } from './movelist/movelist.component';

const routes: Routes = [{
  path: '',
  component: NavbarComponent,
  children: [
    {
      path: '',
      redirectTo: 'list',
      pathMatch: 'full'
    },
    {
      path: 'list',
      component: ListComponent
    },
    {
      path: 'poke/:id',
      component: PokeComponent
    },
    {
      path: 'games',
      component: GamesComponent
    },
    {
      path: 'games/:id',
      component: GameslistComponent
    },
    {
      path: 'moves/:id',
      component: MovelistComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
