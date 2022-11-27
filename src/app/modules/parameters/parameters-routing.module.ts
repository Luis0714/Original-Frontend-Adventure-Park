import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticatedGuard } from 'src/app/guards/autenticated.guard';
import { CreateAttractionComponent } from './attractions/create-attraction/create-attraction.component';
import { EditAttractionComponent } from './attractions/edit-attraction/edit-attraction.component';
import { ListAttractionComponent } from './attractions/list-attraction/list-attraction.component';
import { RemoveAttractionComponent } from './attractions/remove-attraction/remove-attraction.component';
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

const routes: Routes = [
  {
    path: 'create-plan',
    component:CreatePlanComponent,
    canActivate: [AutenticatedGuard]
  },
  {
    path: 'edit-plan',
    component:EditPlanComponent,
    canActivate: [AutenticatedGuard]
  }, {
    path: 'list-plan',
    component:ListPlanComponent,
    canActivate: [AutenticatedGuard]
  }, {
    path: 'remove-plan',
    component:RemovePlanComponent,
    canActivate: [AutenticatedGuard]
  },
  {
    path: 'create-attraction',
    component:CreateAttractionComponent,
    canActivate: [AutenticatedGuard]
  },
  {
    path: 'edit-attraction',
    component:EditAttractionComponent,
    canActivate: [AutenticatedGuard]
  }, {
    path: 'list-attraction',
    component:ListAttractionComponent,
    canActivate: [AutenticatedGuard]
  }, {
    path: 'remove-attraction',
    component:RemoveAttractionComponent,
    canActivate: [AutenticatedGuard]
  },
  {
    path: 'create-park',
    component:CreateParkComponent,
    canActivate: [AutenticatedGuard]
  },
  {
    path: 'edit-park',
    component:EditParkComponent,
    canActivate: [AutenticatedGuard]
  }, {
    path: 'list-park',
    component:ListParkComponent,
    canActivate: [AutenticatedGuard]
  }, {
    path: 'remove-park',
    component:RemoveParkComponent,
    canActivate: [AutenticatedGuard]
  },
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
  }, {
    path: 'remove-user/:_id',
    component:RemoveUserComponent,
    canActivate: [AutenticatedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametersRoutingModule { }
