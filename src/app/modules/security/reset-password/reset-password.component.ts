import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { DefaultValues } from 'src/app/config/default-values';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  fGroup: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private secService: SecurityService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.BuildingForm();
  }
  /**
   * Construccion del formulario con sus datos
   */
  BuildingForm(){
    this.fGroup = this.fb.group({
      username:[DefaultValues.email,[Validators.required,Validators.email,Validators.minLength(5)]]
    })
  }
  /**
   * Ejecucion de la funcionalidad del boton
   */
  ForgotPasswordAction(){
    let userName = this.fGroup.controls["username"].value;
    this.secService.ForgotPasswordRequest(userName).subscribe({
      next:(data) =>{
        if(data){
          alert("Por favor revice la bandeja de entrada de su correo");
          this.router.navigate(["/security/login"])
        }else{
          alert("No se ha enviado la contraseña,  vuelva a intentar");
        }
      },
      error:(err) =>{
        alert("Se ha presentado un fallo recuperando la contraseña")
      }
    }
    );
  }


  get fg(){
    return this.fGroup.controls;
  }
}
