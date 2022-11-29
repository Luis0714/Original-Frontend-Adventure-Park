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
  rol_id: string = DefaultValues.RolIdVisitante;
  

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
      nombre:['',[Validators.required,Validators.minLength(5)]],
      apellido:['',[Validators.required,Validators.minLength(5)]],
      username:['',[Validators.required,Validators.email,Validators.minLength(5)]],
      celular: ['',[Validators.required,Validators.minLength(10)]]
    })
  }
  /**
   * Ejecucion de la funcionalidad del boton
   */
 RegisterAction(){
    let nombres = this.fGroup.controls["nombre"].value;
    let apellidos = this.fGroup.controls["apellido"].value;
    let email = this.fGroup.controls["username"].value;
    let celular = this.fGroup.controls["celular"].value;
    let rol = this.rol_id;
    
    this.secService.RegisternewUser(nombres, apellidos, email, celular, rol).subscribe({
      next:(data) =>{
        if(data){
          
          alert("Por favor revise la bandeja de entrada de su correo");
          this.router.navigate(["/security/login"])
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
