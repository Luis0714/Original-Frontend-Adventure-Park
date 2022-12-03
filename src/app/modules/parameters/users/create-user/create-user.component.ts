import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DefaultValues } from 'src/app/config/default-values';
import { RolModel } from 'src/app/models/rol.model';
import { RolServiceService } from 'src/app/services/parameters/rol-service.service';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  fGroup: FormGroup = new FormGroup ({});
  rol_id: string = DefaultValues.RolIdVisitante;
  roles:RolModel[] = [];
  seleccionado:RolModel = {
    _id:'',
    nombre:'',
    detalles:''
  };
  

  constructor(
    private fb: FormBuilder,
    private secService: SecurityService,
    private router: Router,
    private RolService:RolServiceService
  ) { }

  ngOnInit(): void {
    this.BuildingForm();
    this.ListRecords();
 
  }

  /**
   * Construccion del formulario con sus datos
   */
   BuildingForm(){
    this.fGroup = this.fb.group({
      nombre:['',[Validators.required,Validators.minLength(5)]],
      apellido:['',[Validators.required,Validators.minLength(5)]],
      username:['',[Validators.required,Validators.email,Validators.minLength(5)]],
      celular: ['',[Validators.required,Validators.minLength(10)]],
      seleccionado:['',[Validators.required]]
    })
  }

  ListRecords() {
    this.RolService.getRecorList().subscribe({
      next: (data) => {
        console.log()
         this.roles = data;
      },error: (err) => {
       alert("Error obteniendo la información")   
    }
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
    let rol = this.fGroup.controls["seleccionado"].value;
    
    console.log("Seleccionado ",rol);
    if(this.fGroup.invalid){
      alert("Faltan datos")
    }else{
    this.secService.RegisternewUser(nombres, apellidos, email, celular, rol).subscribe({
      next:(data) =>{
        if(data){
          alert("Por favor revise la bandeja de entrada de su correo");
          this.router.navigate(["/parameters/list-user"])
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
  }

  get fg(){
    return this.fGroup.controls;
  }

}