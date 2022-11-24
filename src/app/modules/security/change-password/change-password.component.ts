import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MD5 } from 'crypto-js';
import { DefaultValues } from 'src/app/config/default-values';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  FG: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private secService: SecurityService,
    private router: Router
  ) { }


ngOnInit(): void {
  this.BuildingForm();
}
/**
 * Construccion del formulario con sus datos
 */
BuildingForm(){
  this.FG = this.fb.group({
    user:[DefaultValues.email,[Validators.required,Validators.email,Validators.minLength(5)]],
    newPassword:['',[Validators.required,Validators.minLength(5)]],
    confirPassword:['',[Validators.required,Validators.minLength(5)]],
    oldPassword:['',[Validators.required,Validators.minLength(5)]]
  })
}
/**
 * Ejecucion de la funcionalidad del boton
 */
ChangePasswordAction(){
  let user = this.FG.controls["user"].value;
  let newPassword = this.FG.controls["newPassword"].value;
  let confirPassword = this.FG.controls["confirPassword"].value;
  let oldPassword = this.FG.controls["oldPassword"].value;
  //cifrar contraseña plana
  let cryptoOldPassword = MD5(oldPassword).toString();
  console.log(cryptoOldPassword);

  this.secService.ChangePasswordRequest(user,newPassword,confirPassword,cryptoOldPassword).subscribe({
    next:(data) =>{
      if(data){
        alert("Por favor revice la bandeja de entrada de su correo");
        this.router.navigate(["/security/login"])
      }else{
        alert("No se ha cambiado la contraseña, intentelo de nuevo");
      }
    },
    error:(err) =>{
      console.log(err)
      alert("Se ha presentado un fallo en el proceso de login")
    }
  }
  );
}

get fg(){
  return this.FG.controls;
}
}

