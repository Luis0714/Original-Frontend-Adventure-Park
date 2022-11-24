import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/services/security.service';
import { DefaultValues } from 'src/app/config/default-values';
import { ApisInfo } from '../../../config/apisInfo';
var MD5 = require("crypto-js/md5");
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  fGroup: FormGroup = new FormGroup ({});
  rol_id: string = ApisInfo.ROL_ID;

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
      nombre:[DefaultValues.name,[Validators.required,Validators.minLength(5)]],
      apellido:[DefaultValues.lastName,[Validators.required,Validators.minLength(5)]],
      username:[DefaultValues.email_default,[Validators.required,Validators.email,Validators.minLength(5)]],
      celular: [DefaultValues.celular,[Validators.required,Validators.minLength(10)]]
    })
  }
  /**
   * Ejecucion de la funcionalidad del boton
   */
 RegisterAction(){
    let nombre = this.fGroup.controls["name"].value;
    let apellido = this.fGroup.controls["last_name"].value;
    let email = this.fGroup.controls["email"].value;
    let celular = this.fGroup.controls["cel"].value;
    let rol = this.rol_id;
    alert('tomé los datos')
    this.secService.RegisternewUser(nombre, apellido, email, celular, rol).subscribe({
      next:(data) =>{
        if(data){
          alert("La contraseña ha sido enviada al correo electrónico, "
          +"por favor cambiela inmediatamente");
          this.router.navigate(["/security/change-password"])
        }else{
          alert("No se pudo crear el nuevo usuario, por favor intentelo de nuevo");
        }
      },
      error:(err) =>{
        console.log(err)
        alert("Error en el registro de usuario")
      }
    }
    );
  }

  get fg(){
    return this.fGroup.controls;
  }

}
