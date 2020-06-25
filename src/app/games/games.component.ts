import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  generation: any[];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    return this.http.get("https://pokeapi.co/api/v2/generation/").subscribe((gen: any) => {
      this.generation = gen.results
    })
  }

}
