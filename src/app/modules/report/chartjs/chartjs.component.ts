

import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js/auto'
import { concat } from 'rxjs';
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
  json:any 
  
  constructor() { }

  ngOnInit(): void {
    this.report()
  }

  jsonAplanado(){
    this.json = this.url+'?$count=filter={"include":["ventasPlanes"]}'
    return []concat.apply([],this.json).length
    
  }

  report(){
    const data = [
      { month: "Enero", count: this.url+'?$count=filter={"include":["ventasPlanes"]}'},
      { month: "Febrero", count: 20 },
      { month: "Marzo", count: 15 },
      { month: "Abril", count: 25 },
      { month: "Mayo", count: 22 },
      { month: "Junio", count: 30 },
      { month: "Julio", count: 28 },
      { month: "Agosto", count: 28 },
      { month: "Septiembre", count: 28 },
      { month: "Octubre", count: 28 },
      { month: "Noviembre", count: 28 },
      { month: "Diciembre", count: this.url+'?$count=filter={"include":["ventasPlanes"]}'},
    ];
    FirstReport(data);
  }

}
