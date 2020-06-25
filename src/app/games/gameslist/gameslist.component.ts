import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-gameslist',
  templateUrl: './gameslist.component.html',
  styleUrls: ['./gameslist.component.css']
})
export class GameslistComponent implements OnInit {

  genName: any;
  region: any;
  pokemonSpecies: any[];
  games: any[];

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.route.params.subscribe((param: Params) => {
      this.genName = param['id'];
      console.log(this.genName);
      this.getGameDetails();
    })
  }

  getGameDetails() {
    return this.http.get('https://pokeapi.co/api/v2/generation/' + this.genName).pipe(
      map((poke: any) => {
        poke.pokemon_species = poke.pokemon_species.map((pokeResult: any) => {
          pokeResult.id = this.getPokeId(pokeResult);
          return pokeResult;
        });
        return poke;
      })
    ).subscribe(
      (detail: any) => {
        console.log(detail)
        this.region = detail.main_region
        this.games = detail.version_groups
        this.pokemonSpecies = detail.pokemon_species.sort((a: any, b: any) => {
          return a.id - b.id
          }
        )
      }
    )
  }

  getPokeId(poke) {
    return poke.url.replace("https://pokeapi.co/api/v2/pokemon-species", "").replace(/[/]/g, "");
  }

}
