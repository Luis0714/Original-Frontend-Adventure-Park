import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
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
    private secService: SecurityService
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
          alert("Por favor revice la badeja de entrada de su correo");
        }else{
          alert("No se ha enviado la contraseña");
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
