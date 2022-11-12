import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyCodeComponent } from './verify-code/verify-code.component';

const routes: Routes = [
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"forgot-password",
    component: ResetPasswordComponent
  },
  {
    path:"verify-code",
    component: VerifyCodeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
