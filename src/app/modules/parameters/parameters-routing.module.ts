import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticatedGuard } from 'src/app/guards/autenticated.guard';
import { UnauthenticatedGuard } from 'src/app/guards/unauthenticated.guard';
import { CreateAttractionComponent } from './attractions/create-attraction/create-attraction.component';
import { EditAttractionComponent } from './attractions/edit-attraction/edit-attraction.component';
import { ListAttractionComponent } from './attractions/list-attraction/list-attraction.component';
import { RemoveAttractionComponent } from './attractions/remove-attraction/remove-attraction.component';
import { CreateCityComponent } from './city/create-city/create-city.component';
import { EditCityComponent } from './city/edit-city/edit-city.component';
import { ListCityComponent } from './city/list-city/list-city.component';
import { RemoveCityComponent } from './city/remove-city/remove-city.component';
import { ContactenosComponent } from './contactenos/contactenos/contactenos.component';
import { CreateDepartmentComponent } from './department/create-department/create-department.component';
import { EditDepartmentComponent } from './department/edit-department/edit-department.component';
import { ListDepartmentComponent } from './department/list-department/list-department.component';
import { RemoveDepartmentComponent } from './department/remove-department/remove-department.component';
import { CreateParkComponent } from './parks/create-park/create-park.component';
import { EditParkComponent } from './parks/edit-park/edit-park.component';
import { ListParkComponent } from './parks/list-park/list-park.component';
import { RemoveParkComponent } from './parks/remove-park/remove-park.component';
import { CreatePlanComponent } from './plans/create-plan/create-plan.component';
import { EditPlanComponent } from './plans/edit-plan/edit-plan.component';
import { ListPlanComponent } from './plans/list-plan/list-plan.component';
import { RemovePlanComponent } from './plans/remove-plan/remove-plan.component';
import { CreateRolComponent } from './rols/create-rol/create-rol.component';
import { EditRolComponent } from './rols/edit-rol/edit-rol.component';
import { ListRolComponent } from './rols/list-rol/list-rol.component';
import { RemoveRolComponent } from './rols/remove-rol/remove-rol.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { ListUserComponent } from './users/list-user/list-user.component';
import { RemoveUserComponent } from './users/remove-user/remove-user.component';
import { CreateZonaComponent } from './zonas/create-zona/create-zona.component';
import { EditZonaComponent } from './zonas/edit-zona/edit-zona.component';
import { ListZonaComponent } from './zonas/list-zona/list-zona.component';
import { RemoveZonaComponent } from './zonas/remove-zona/remove-zona.component';
import { CreateVentaPlanComponent } from './venta-plans/create-venta-plan/create-venta-plan.component';
import { EditVentaPlanComponent } from './venta-plans/edit-venta-plan/edit-venta-plan.component';
import { ListVentaPlanComponent } from './venta-plans/list-venta-plan/list-venta-plan.component';
import { RemoveVentaPlanComponent } from './venta-plans/remove-venta-plan/remove-venta-plan.component';
import { TarejetaValidateComponent } from './tarejeta/tarejeta-validate/tarejeta-validate.component';


const routes: Routes = [
  {
    path: 'contactenos',
    component:ContactenosComponent
  },

///////////////////////////////
  {
    path: 'create-plan',
    component:CreatePlanComponent,
    canActivate: [AutenticatedGuard]
  },
  {
    path: 'edit-plan/:id',
    component:EditPlanComponent,
    canActivate: [AutenticatedGuard]
  }, 
  {
    path: 'list-plan',
    component:ListPlanComponent,
  }, 
  {
    path: 'remove-plan/:id',
    component:RemovePlanComponent,
    canActivate: [AutenticatedGuard]
  },


//////////////////////////////

  {
    path: 'create-attraction',
    component:CreateAttractionComponent,
    canActivate: [AutenticatedGuard]
  },
  {
    path: 'edit-attraction/:id',
    component:EditAttractionComponent,
    canActivate: [AutenticatedGuard]
  }, {
    path: 'list-attraction',
    component:ListAttractionComponent
    
  }, {
    path: 'remove-attraction/:id',
    component:RemoveAttractionComponent,
    canActivate: [AutenticatedGuard]
  },

  ////////////////////////////
  {
    path: 'create-park',
    component:CreateParkComponent,
    canActivate: [AutenticatedGuard]
  },
  {
    path: 'edit-park/:id',
    component:EditParkComponent,
    canActivate: [AutenticatedGuard]
  }, {
    path: 'list-park',
    component:ListParkComponent
    
  }, {
    path: 'remove-park',
    component:RemoveParkComponent,
    canActivate: [AutenticatedGuard]
  },


////////////////////////////

  {
    path: 'create-rol',
    component:CreateRolComponent,
    canActivate: [AutenticatedGuard]
  },
  {
    path: 'edit-rol/:_id',
    component:EditRolComponent,
    canActivate: [AutenticatedGuard]
  }, {
    path: 'list-rol',
    component:ListRolComponent,
    canActivate: [AutenticatedGuard]
  }, {
    path: 'remove-rol/:_id',
    component:RemoveRolComponent,
    canActivate: [AutenticatedGuard]
  },

  ///////////////////////////
  {
    path: 'create-city',
    component:CreateCityComponent,
    canActivate: [AutenticatedGuard]
  },
  {
    path: 'edit-city/:id',
    component:EditCityComponent,
    canActivate: [AutenticatedGuard]
  }, {
    path: 'list-city',
    component:ListCityComponent,
    canActivate: [AutenticatedGuard]
  }, {
    path: 'remove-city/:id',
    component:RemoveCityComponent,
    canActivate: [AutenticatedGuard]
  },
    /////
  {
    path: 'create-department',
    component:CreateDepartmentComponent,
    canActivate: [AutenticatedGuard]
  },
  {
    path: 'edit-department/:id',
    component:EditDepartmentComponent,
    canActivate: [AutenticatedGuard]
  }, {
    path: 'list-department',
    component:ListDepartmentComponent,
    canActivate: [AutenticatedGuard]
  }, {
    path: 'remove-department/:id',
    component:RemoveDepartmentComponent,
    canActivate: [AutenticatedGuard]
  },

  ///////////////////////
  {
    path: 'create-user',
    component:CreateUserComponent,
    canActivate: [AutenticatedGuard]
  },
  {
    path: 'edit-user/:_id',
    component:EditUserComponent,
    canActivate: [AutenticatedGuard]
  }, {
    path: 'list-user',
    component:ListUserComponent,
    canActivate: [AutenticatedGuard]
  }, 
  {
    path: 'remove-user/:id',
    component:RemoveUserComponent,
    canActivate: [AutenticatedGuard]
  },
  {
    path: 'create-zona',
    component:CreateZonaComponent,
    canActivate: [AutenticatedGuard]
  },
  {
    path: 'edit-zona/:id',
    component:EditZonaComponent,
    canActivate: [AutenticatedGuard]
  }, {
    path: 'list-zona',
    component:ListZonaComponent,
    canActivate: [AutenticatedGuard]
  }, 
  {
    path: 'remove-zona/:id',
    component:RemoveZonaComponent,
    canActivate: [AutenticatedGuard]
  },
//////////

{
  path: 'create-venta-plan',
  component:CreateVentaPlanComponent,
  canActivate: [AutenticatedGuard]
},
{
  path: 'edit-venta-plan/:_id',
  component:EditVentaPlanComponent,
  canActivate: [AutenticatedGuard]
}, {
  path: 'list-venta-plan',
  component:ListVentaPlanComponent,
  canActivate: [AutenticatedGuard]
}, 
{
  path: 'remove-venta-plan/:id',
  component:RemoveVentaPlanComponent,
  canActivate: [AutenticatedGuard]
},

//////////

{
  path: 'tarjeta/:id',
  component: TarejetaValidateComponent,
  canActivate: [AutenticatedGuard]
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametersRoutingModule { }
