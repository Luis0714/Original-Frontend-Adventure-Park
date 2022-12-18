import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ChartjsComponent } from './chartjs/chartjs.component';
import {Chart} from 'chart.js/auto'


@NgModule({
  declarations: [
    ChartjsComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule
  ]
})
export class ReportModule { }
