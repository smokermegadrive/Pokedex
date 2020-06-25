import {
  Component,
  OnInit
} from '@angular/core';
import {
  HttpClient
} from "@angular/common/http";
import {
  ActivatedRoute, Params
} from '@angular/router';
import {
  finalize, map
} from 'rxjs/operators';

@Component({
  templateUrl: './poke.component.html',
  styleUrls: ['./poke.component.css']
})
export class PokeComponent implements OnInit {
  fetching: boolean;
  id: any;
  loadedStats: any[];
  loadedAbility: any[];
  loadedType: any[];
  loadedMoves: any[];
  loadedSprites: any;
  loadedWeight: any;
  loadedHeight: any;
  loadedBE: any;
  loadedSpecies: any;
  loadedId: any;
  loadedPokedexText: any[];
  loadedDescription: any[];
  loadedBaseEvo: any;
  spriteEvo: any[];
  dataLoaded: Promise < boolean > ;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.route.params.subscribe((param: Params) => {
      this.id = param['id']
      this.getDetails();
      this.getSpeciesDetails();
    })
  }

  getDetails() {
    this.fetching = true;
    return this.http.get("https://pokeapi.co/api/v2/pokemon/" + this.id)
      .pipe(map((poke: any) => {
        poke.moves = poke.moves.map((pokeResult: any) => {
          pokeResult.move.id = this.getMoveId(pokeResult);
          return pokeResult;
        });
        return poke;
      }),
        finalize(() => {
          this.fetching = false;
        }))
      .subscribe(
        (detail: any) => {
          console.log(detail)
          this.loadedStats = detail.stats
          this.loadedAbility = detail.abilities
          this.loadedType = detail.types
          this.loadedMoves = detail.moves
          this.loadedSprites = detail.sprites
          this.loadedWeight = detail.weight
          this.loadedHeight = detail.height
          this.loadedBE = detail.base_experience
          this.loadedSpecies = detail.species
          this.loadedId = detail.id
          this.dataLoaded = Promise.resolve(true)
        }
      )
  }

  getSpeciesDetails() {
    this.fetching = true;
    return this.http.get("https://pokeapi.co/api/v2/pokemon-species/" + this.id)
      .pipe(
        finalize(() => {
          this.fetching = false;
        })
      ).subscribe((species: any) => {
        console.log(species)
        this.loadedPokedexText = species.flavor_text_entries.find(entry => entry.language.name === "en")
        this.loadedDescription = species.genera.find(entry => entry.language.name === "en")
        let loadedEvoChain = species.evolution_chain
        this.http.get(loadedEvoChain.url).subscribe((evo: any) => {
          console.log(evo)
          this.loadedBaseEvo = evo.chain
          this.mapEvolution(this.loadedBaseEvo)

          /*let names = this.loadedBaseEvo.evolves_to.find(entry => entry.species.name)
          let namess = names.evolves_to.find(entry => entry.species.name)
          let response1 = this.http.get("https://pokeapi.co/api/v2/pokemon/" + evo.chain.species.name)
          let response2 = this.http.get("https://pokeapi.co/api/v2/pokemon/" + names.species.name)
          let response3 = this.http.get("https://pokeapi.co/api/v2/pokemon/" + namess.species.name)

          forkJoin([response1, response2, response3]).subscribe((results: any) => {
            this.spriteEvo = results
            console.log(this.spriteEvo)
          })
          this.http.get("https://pokeapi.co/api/v2/pokemon/" + evo.chain.species.name).subscribe((test: any) => {
            console.log(test)
          } )
          
          this.loadedEvoOne = evo.chain.evolves_to
          this.loadedEvoTwo = evo.chain.evolves_to.evolves_to
          */
        })
      })
  }

  mapEvolution(evolvesTo: any) {
    console.log("evolvesTo", evolvesTo)
    this.http.get('https://pokeapi.co/api/v2/pokemon/' + evolvesTo.species.name).subscribe((response: any) =>
    {
      evolvesTo.sprites = response.sprites
      console.log("evolveToResponse", response)
    })
    if (evolvesTo.evolves_to) {
      evolvesTo.evolves_to.forEach(element => {
        this.mapEvolution(element)
      });
    }
  }

  getPokeId(poke) {
    return poke.url.replace('https://pokeapi.co/api/v2/pokemon-species/', "").replace(/[/]/g, "");
  }

  getMoveId(poke) {
    return poke.move.url.replace('https://pokeapi.co/api/v2/move/', "").replace(/[/]/g, "");
  }
}
