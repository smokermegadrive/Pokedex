import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-movelist',
  templateUrl: './movelist.component.html',
  styleUrls: ['./movelist.component.css']
})
export class MovelistComponent implements OnInit {

  routeId: any;
  name: any;
  power: any;
  pp: any;
  type: any;
  accuracy: any;
  damageType: any;
  text: any[];

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((param: Params) => {
      this.routeId = param['id'];
    })
    this.getMoves()
  }

  getMoves() {
    return this.http.get("https://pokeapi.co/api/v2/move/" + this.routeId).subscribe((things: any) => {
      console.log(things);
      this.name = things.name
      this.power = things.power
      this.pp = things.pp
      this.type = things.type
      this.text = things.flavor_text_entries.find(entry => entry.language.name === "en")
      this.accuracy = things.accuracy
      this.damageType = things.damage_class
    })
  }
}
