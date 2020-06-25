import { OnInit, Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, map } from "rxjs/operators";

@Component({
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit {
  loadedPoke: any[];
  sub: any;
  page: any;
  nextPage: string;
  previousPage: string;
  fetching: boolean;
  dataLoaded: Promise<boolean>;
  endPoint = "https://pokeapi.co/api/v2/pokemon";

  constructor(private route: ActivatedRoute, private router: Router , private http: HttpClient) {}

  ngOnInit() {
    this.loadPokes(this.endPoint);
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        this.page = (+params['page'] || 0);
        console.log('Query param page: ', this.page);
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  loadPokes(url: string) {
    this.fetching = true;
    return this.http
      .get(url)
      .pipe(
        map((poke: any) => {
          poke.results = poke.results.map((pokeResult: any) => {
            pokeResult.id = this.getPokeId(pokeResult);
            return pokeResult;
          });
          return poke;
        }),
        finalize(() => {
          this.fetching = false;
        })
      )
      .subscribe((pokemon: any) => {
        console.log(pokemon);
        this.loadedPoke = pokemon.results;
        this.nextPage = pokemon.next;
        this.previousPage = pokemon.previous;
      });
  }

  getPokeId(poke) {
    return poke.url.replace(this.endPoint, "").replace(/[/]/g, "");
  }

  nextPag() {
    this.router.navigate([], { queryParams: { page: this.page + 1 } });
  }

  previousPag() {
    this.router.navigate([], { queryParams: { page: this.page - 1 } });
  }
}
