import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultValues } from 'src/app/config/default-values';
import { RolModel } from 'src/app/models/rol.model';
import { RolModel2 } from 'src/app/models/rol.model2';
import { UserModel2 } from 'src/app/models/user.model2';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { RolServiceService } from 'src/app/services/parameters/rol-service.service';
import { UserService } from 'src/app/services/parameters/user.service';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  fGroup: FormGroup = new FormGroup ({});
  rol_id: string = DefaultValues.RolIdVisitante;
  rolquellega: string = 'Seleccione el rol';
  roles:RolModel[] = [];
  users:UserModel2[] = [];
  isIgual:boolean = false;
  seleccionado:RolModel = {
    _id:'',
    nombre:'',
    detalles:''
  };
  

  constructor(
    private fb: FormBuilder,
    private secService: SecurityService,
    private router: Router,
    private userService:UserService,
    private RolService:RolServiceService,
    private route:ActivatedRoute,
    private localStorage:LocalStorageService
  ) { }

  ngOnInit(): void {
    this.BuildingForm();
    this.rolesList();
    this.SearchRequest()
  }

  /**
   * Construccion del formulario con sus datos
   */
   BuildingForm(){
    this.fGroup = this.fb.group({
      id: ['',[Validators.required]],
      clave: ['',[Validators.required]],
      nombre:['',[Validators.required,Validators.minLength(5)]],
      apellido:['',[Validators.required,Validators.minLength(5)]],
      username:['',[Validators.required,Validators.email,Validators.minLength(5)]],
      celular: ['',[Validators.required,Validators.minLength(10)]],
      seleccionado:['',[Validators.required]]
    })
  }
  rolesList() {
    this.RolService.getRecorList().subscribe({
      next: (data) => {
        console.log()
         this.roles = data;
      },error: (err) => {
       alert("Error obteniendo la información")   
    }
    })
  }
 

  SearchRequest(){
    let id = this.route.snapshot.params["_id"];
    console.log("ID ",id)
    this.userService.getRecorByID(id).subscribe({
      next: (data)=>{
        this.RolService.getRecorByID(data.rolId).subscribe({
          next:(rol) =>{
            this.fGroup.controls["id"].setValue(data._id);
            this.fGroup.controls["clave"].setValue(data.clave);
            this.fGroup.controls["nombre"].setValue(data.Nombres);
            this.fGroup.controls["apellido"].setValue(data.Apellidos);
            this.fGroup.controls["celular"].setValue(data.Celular);
            this.fGroup.controls["username"].setValue(data.email);
            //this.fGroup.controls["seleccionado"].setValue(rol.nombre);
            this.rolquellega = rol.nombre;
          },
          error:(err)=>{
            alert("Error obteniendo la informacion del rol");
          }
        });
      },
      error:(err)=>{
        alert("Error obteniendo la informacion del registro");
      }
    })
  }


  /**
   * Ejecucion de la funcionalidad del boton
   */
 EditAction(){
    let id = this.fGroup.controls["id"].value;
    let clave = this.fGroup.controls["clave"].value;
    let nombres = this.fGroup.controls["nombre"].value;
    let apellidos = this.fGroup.controls["apellido"].value;
    let email = this.fGroup.controls["username"].value;
    let celular = this.fGroup.controls["celular"].value;
    let rol = this.fGroup.controls["seleccionado"].value;
   
    let datos:UserModel2={
      _id:id,
      Nombres:nombres,
      Apellidos:apellidos,
      email:email,
      clave:clave,
      Celular:celular,
      rolId:rol
    }
  
    if(this.fGroup.invalid){
      alert("Faltan datos")
    }else{
    this.userService.editRecord(datos).subscribe({
      next:(data) =>{
        if(!data){
          alert("Por favor revise la bandeja de entrada de su correo");
          this.router.navigate(["/parameters/list-user"])
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