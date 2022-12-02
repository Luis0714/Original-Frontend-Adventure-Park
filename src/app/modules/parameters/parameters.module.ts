import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametersRoutingModule } from './parameters-routing.module';
import { CreatePlanComponent } from './plans/create-plan/create-plan.component';
import { EditPlanComponent } from './plans/edit-plan/edit-plan.component';
import { ListPlanComponent } from './plans/list-plan/list-plan.component';
import { RemovePlanComponent } from './plans/remove-plan/remove-plan.component';
import { CreateAttractionComponent } from './attractions/create-attraction/create-attraction.component';
import { EditAttractionComponent } from './attractions/edit-attraction/edit-attraction.component';
import { ListAttractionComponent } from './attractions/list-attraction/list-attraction.component';
import { RemoveAttractionComponent } from './attractions/remove-attraction/remove-attraction.component';
import { CreateParkComponent } from './parks/create-park/create-park.component';
import { EditParkComponent } from './parks/edit-park/edit-park.component';
import { ListParkComponent } from './parks/list-park/list-park.component';
import { RemoveParkComponent } from './parks/remove-park/remove-park.component';
import { CreateRolComponent } from './rols/create-rol/create-rol.component';
import { ListRolComponent } from './rols/list-rol/list-rol.component';
import { EditRolComponent } from './rols/edit-rol/edit-rol.component';
import { RemoveRolComponent } from './rols/remove-rol/remove-rol.component';
//
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateCityComponent } from './city/create-city/create-city.component';
import { EditCityComponent } from './city/edit-city/edit-city.component';
import { ListCityComponent } from './city/list-city/list-city.component';
import { RemoveCityComponent } from './city/remove-city/remove-city.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { RemoveUserComponent } from './users/remove-user/remove-user.component';
import { ListUserComponent } from './users/list-user/list-user.component';
import { CreateDepartmentComponent } from './department/create-department/create-department.component';
import { EditDepartmentComponent } from './department/edit-department/edit-department.component';
import { ListDepartmentComponent } from './department/list-department/list-department.component';
import { RemoveDepartmentComponent } from './department/remove-department/remove-department.component';
import { ContactenosComponent } from './contactenos/contactenos/contactenos.component';
import { CreateVentaPlanComponent } from './venta-plans/create-venta-plan/create-venta-plan.component';
import { EditVentaPlanComponent } from './venta-plans/edit-venta-plan/edit-venta-plan.component';
import { ListVentaPlanComponent } from './venta-plans/list-venta-plan/list-venta-plan.component';
import { RemoveVentaPlanComponent } from './venta-plans/remove-venta-plan/remove-venta-plan.component';
import { TarjetaComponent } from './tarjeta/tarjeta.component';
import { CreateFoodStandComponent } from './food-stand/create-food-stand/create-food-stand.component';
import { EditFoodStandComponent } from './food-stand/edit-food-stand/edit-food-stand.component';
import { ListFoodStandComponent } from './food-stand/list-food-stand/list-food-stand.component';
import { RemoveFoodStandComponent } from './food-stand/remove-food-stand/remove-food-stand.component';


@NgModule({
  declarations: [
    CreatePlanComponent,
    EditPlanComponent,
    ListPlanComponent,
    RemovePlanComponent,
    CreateAttractionComponent,
    EditAttractionComponent,
    ListAttractionComponent,
    RemoveAttractionComponent,
    CreateParkComponent,
    EditParkComponent,
    ListParkComponent,
    RemoveParkComponent,
    CreateRolComponent,
    ListRolComponent,
    EditRolComponent,
    RemoveRolComponent,
    CreateCityComponent,
    EditCityComponent,
    ListCityComponent,
    RemoveCityComponent,
    CreateUserComponent,
    EditUserComponent,
    RemoveUserComponent,
    ListUserComponent,
    EditDepartmentComponent,
    ListDepartmentComponent,
    RemoveDepartmentComponent,
    CreateDepartmentComponent,
    ContactenosComponent,
    CreateVentaPlanComponent,
    EditVentaPlanComponent,
    ListVentaPlanComponent,
    RemoveVentaPlanComponent,
    TarjetaComponent,
    CreateFoodStandComponent,
    EditFoodStandComponent,
    ListFoodStandComponent,
    RemoveFoodStandComponent,
   
  ],
  imports: [
    CommonModule,
    ParametersRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ParametersModule { }
