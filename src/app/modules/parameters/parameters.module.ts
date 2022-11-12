import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametersRoutingModule } from './parameters-routing.module';
import { CreatePlanComponent } from './plans/create-plan/create-plan.component';
import { EditPlanComponent } from './plans/edit-plan/edit-plan.component';
import { ListPlanComponent } from './plans/list-plan/list-plan.component';
import { RemovePlanComponent } from './plans/remove-plan/remove-plan.component';


@NgModule({
  declarations: [
    CreatePlanComponent,
    EditPlanComponent,
    ListPlanComponent,
    RemovePlanComponent
  ],
  imports: [
    CommonModule,
    ParametersRoutingModule
  ]
})
export class ParametersModule { }
