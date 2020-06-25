import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  generation: any[];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    return this.http.get("https://pokeapi.co/api/v2/generation/").subscribe((gen: any) => {
      this.generation = gen.results
    })
  }

}
