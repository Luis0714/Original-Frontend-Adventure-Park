import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticatedGuard } from 'src/app/guards/autenticated.guard';
import { UnauthenticatedGuard } from 'src/app/guards/unauthenticated.guard';
import { PlansService } from 'src/app/services/parameters/plans.service';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyCodeComponent } from './verify-code/verify-code.component';
import { ListPlanComponent } from '../parameters/plans/list-plan/list-plan.component';
const routes: Routes = [
  {
    path:"login",
    component:LoginComponent,
    canActivate: [UnauthenticatedGuard]
  },
  {
    path:"forgot-password",
    component: ResetPasswordComponent,
    canActivate: [UnauthenticatedGuard]
  },
  {
    path:"change-password",
    component: ChangePasswordComponent,
    canActivate: [UnauthenticatedGuard]
  },
  {
    path:"verify-code",
    component: VerifyCodeComponent,
    canActivate: [UnauthenticatedGuard]
  },
  {
    path:'logout',
    component: LogoutComponent,
    canActivate: [AutenticatedGuard]
  },
  {
    path:'register',
    component:RegisterComponent,
    canActivate: [UnauthenticatedGuard]
  },
  {
  path:'list-plan',
  component:ListPlanComponent,
  canActivate: [UnauthenticatedGuard]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
