

import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js/auto'
import { ApisInfo } from 'src/app/config/apisInfo';

declare const FirstReport: any;

@Component({
  selector: 'app-chartjs',
  templateUrl: './chartjs.component.html',
  styleUrls: ['./chartjs.component.css']
})
export class ChartjsComponent implements OnInit {
  Baseurl:string=ApisInfo.MS_LOG_URL;
  actionName = 'planes';
  reportPlan: number =1;
  url = `${this.Baseurl}/${this.actionName}/${this.reportPlan}`;
  month: string =''
  constructor() { }

  ngOnInit(): void {
    this.report()
  }

  report(){
    const data = [
      { month: "Enero", count: this.url+'?filter={"include":["planes"]}' },
      { month: 2011, count: 20 },
      { year: 2012, count: 15 },
      { year: 2013, count: 25 },
      { year: 2014, count: 22 },
      { year: 2015, count: 30 },
      { year: 2016, count: 28 },
    ];
    FirstReport(data);
  }

}
