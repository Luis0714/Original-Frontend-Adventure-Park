import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartjsComponent } from './chartjs/chartjs.component';


const routes: Routes = [
  {
    path: 'reporte1',
    component:ChartjsComponent
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
