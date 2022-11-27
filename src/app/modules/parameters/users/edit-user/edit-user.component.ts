import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DefaultValues } from 'src/app/config/default-values';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  fGroup: FormGroup = new FormGroup ({});
  rol_id: string = DefaultValues.RolIdauxiliar;
  load: boolean = false;

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

