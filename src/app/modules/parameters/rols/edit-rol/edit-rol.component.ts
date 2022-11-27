import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { RolModel } from 'src/app/models/rol.model';
import { RolModel2 } from 'src/app/models/rol.model2';
import { RolServiceService } from 'src/app/services/parameters/rol-service.service';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-edit-rol',
  templateUrl: './edit-rol.component.html',
  styleUrls: ['./edit-rol.component.css']
})
export class EditRolComponent implements OnInit {
  fGroup: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private secService: SecurityService,
    private router: Router,
    private RolService:RolServiceService,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.BuildingForm();
    this.SearchRequest();
  }
  /**
   * Construccion del formulario con sus datos
   */
  BuildingForm(){
    this.fGroup = this.fb.group({
      id: ['',[]],
      name:['',[Validators.required,Validators.minLength(5)]],
      details:['',[Validators.required],Validators.maxLength(50)]
    })
  }
  SearchRequest(){
    let id = this.route.snapshot.params["_id"];
    console.log("ID ",id)
    this.RolService.getRecorByID(id).subscribe({
      next: (data)=>{
        console.log("DATA ",data);
        this.fGroup.controls["id"].setValue(data._id);
        this.fGroup.controls["name"].setValue(data.nombre);
        this.fGroup.controls["details"].setValue(data.detalles);
      },
      error:(err)=>{
        alert("Error obteniendo la informacion del registro");
      }
    })

    
  }
  EditRolAction(){
    console.log("Entreee");
    let id = this.fGroup.controls["id"].value;
    let name = this.fGroup.controls["name"].value;
    let details = this.fGroup.controls["details"].value;
    let datos:RolModel={
      _id:id,
      nombre:name,
      detalles:details
    }
    this.RolService.editRecord(datos).subscribe({
      next:(data) =>{
        if(!data){
          console.log(data)
          alert('Registro editado con exito')
          this.router.navigate(["/parameters/list-rol"])
        }
      },
      error:(err) =>{

        alert("Se ha presentado un fallo creacion del registro")
      }
  })
}
  get fg(){
    return this.fGroup.controls;
  }


}
