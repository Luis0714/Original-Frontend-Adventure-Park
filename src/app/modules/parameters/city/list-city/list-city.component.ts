import { Component, OnInit } from '@angular/core';
import { CityModel } from 'src/app/models/city.model';

@Component({
  selector: 'app-list-city',
  templateUrl: './list-city.component.html',
  styleUrls: ['./list-city.component.css']
})
export class ListCityComponent implements OnInit {

  recordList:CityModel[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
