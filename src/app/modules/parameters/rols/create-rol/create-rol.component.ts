import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DefaultValues } from 'src/app/config/default-values';
import { RolModel } from 'src/app/models/rol.model';
import { RolModel2 } from 'src/app/models/rol.model2';
import { RolServiceService } from 'src/app/services/parameters/rol-service.service';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-create-rol',
  templateUrl: './create-rol.component.html',
  styleUrls: ['./create-rol.component.css']
})
export class CreateRolComponent implements OnInit {
  fGroup: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private secService: SecurityService,
    private router: Router,
    private RolService:RolServiceService
  ) { }

  ngOnInit(): void {
    this.BuildingForm();
  }
  /**
   * Construccion del formulario con sus datos
   */
  BuildingForm(){
    this.fGroup = this.fb.group({
      name:['',[Validators.required,Validators.minLength(5)]],
      details:['',[Validators.required],Validators.maxLength(50)]
    })
  }

  CreateRolAction(){
    console.log("Entreee te amoooo");
    let name = this.fGroup.controls["name"].value;
    let details = this.fGroup.controls["details"].value;
    let datos:RolModel2={
      nombre:name,
      detalles:details
    }
    this.RolService.saveRecord(datos).subscribe({
      next:(data) =>{
        if(data){
          alert('Registro creado con exito')
          this.router.navigate(["/parameters/list-rol"])
        }else{
          alert("Error al crear el registro");
        }
      },
      error:(err) =>{
        console.log(err)
        alert("Se ha presentado un fallo creacion del registro")
      }
  })
}
  get fg(){
    return this.fGroup.controls;
  }


}
