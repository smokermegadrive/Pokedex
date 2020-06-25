import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pokedex-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent implements OnInit {

  constructor() { }

  @Input() type: string;

  ngOnInit() {
  }

}
