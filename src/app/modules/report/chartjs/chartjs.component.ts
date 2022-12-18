

import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js/auto'

declare const FirstReport: any;

@Component({
  selector: 'app-chartjs',
  templateUrl: './chartjs.component.html',
  styleUrls: ['./chartjs.component.css']
})
export class ChartjsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.report()
  }

  report(){
    const data = [
      { year: 2010, count: 10 },
      { year: 2011, count: 20 },
      { year: 2012, count: 15 },
      { year: 2013, count: 25 },
      { year: 2014, count: 22 },
      { year: 2015, count: 30 },
      { year: 2016, count: 28 },
    ];
    FirstReport(data);
  }

}
