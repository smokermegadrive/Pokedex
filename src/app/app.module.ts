import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokeComponent } from './poke/poke.component';
import { ListComponent } from './list/list.component';
import { TypeComponent } from './type/type.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GamesComponent } from './games/games.component';
import { GameslistComponent } from './games/gameslist/gameslist.component';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { MovelistComponent } from './movelist/movelist.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    PokeComponent,
    TypeComponent,
    NavbarComponent,
    GamesComponent,
    GameslistComponent,
    PokemonCardComponent,
    MovelistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
