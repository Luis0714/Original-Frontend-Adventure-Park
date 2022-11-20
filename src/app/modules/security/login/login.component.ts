import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import { Route, Router } from '@angular/router';
import { DefaultValues } from 'src/app/config/default-values';
import { SecurityService } from 'src/app/services/security.service';
var MD5 = require("crypto-js/md5");

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  fGroup: FormGroup = new FormGroup({});
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
    this.fGroup = this.fb.group({
      username:[DefaultValues.email,[Validators.required,Validators.email,Validators.minLength(5)]],
      password:[DefaultValues.password,[Validators.required]]
    })
  }
  /**
   * Ejecucion de la funcionalidad del boton
   */
 LoginAction(){
    let userName = this.fGroup.controls["username"].value;
    let password = this.fGroup.controls["password"].value;
    //cifrar contraseña plana
    let cryptoPassword = MD5(password).toString();
    console.log(cryptoPassword)
    this.secService.LoginRequest(userName,cryptoPassword).subscribe({
      next:(data) =>{
        if(data){
          alert("Se ha enviado el codigo de verificacion! "
          +"Por favor revice la bandeja de entrada de su correo");
          this.router.navigate(["/security/verify-code"])
        }else{
          alert("No se ha enviado el codigo de verificacion, intetelo de nuevo");
        }
      },
      error:(err) =>{
        console.log(err)
        alert("Contraseña y/o Usuario invalido")
      }
    }
    );
  }

  ForgotPasswordAction(){
    let userName = this.fGroup.controls["user-name"].value;
    this.secService.ForgotPasswordRequest(userName).subscribe({
      next:(data) =>{
        if(data){
          this.router.navigate(["/security/reset-password"])
        }else{
          alert("Datos invalidos");
        }
      },
      error:(err) =>{
        console.log(err)
        alert("Se ha presentado un fallo en el proceso de cambio de contraseña")
      }
  })
}


  get fg(){
    return this.fGroup.controls;
  }
}

