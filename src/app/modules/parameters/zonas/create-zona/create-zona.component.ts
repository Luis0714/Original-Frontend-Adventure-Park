import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DefaultValues } from 'src/app/config/default-values';
import { ParkModel } from 'src/app/models/park.model';
import { ZonaModel } from 'src/app/models/zona.model';
import { ZonaModel2 } from 'src/app/models/zona.model2';
import { ParkService } from 'src/app/services/parameters/park.service';
import { ZonaService } from 'src/app/services/parameters/zona.service';

@Component({
  selector: 'app-create-zona',
  templateUrl: './create-zona.component.html',
  styleUrls: ['./create-zona.component.css']
})
export class CreateZonaComponent implements OnInit {
  fGroup: FormGroup = new FormGroup ({});
  parques:ParkModel[] = [];
  seleccionado:ParkModel = new ParkModel();
  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ParkServices:ParkService,
    private ZonaService:ZonaService
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
      nombre:['',[Validators.required]],
      color:['',[Validators.required]],
      descripcion:['',[Validators.required]],
      seleccionado:['',[Validators.required]]
    })
  }

  ListRecords() {
    this.ParkServices.getRecorList().subscribe({
      next: (data) => {
        console.log("Parques ",data)
         this.parques = data;
      },error: (err) => {
       alert("Error obteniendo la información")   
    }
    })
  }

  /**
   * Ejecucion de la funcionalidad del boton
   */
 SaveRecordAction(){
    let nombre = this.fGroup.controls["nombre"].value;
    let color = this.fGroup.controls["color"].value;
    let descripcion = this.fGroup.controls["descripcion"].value;
    let parque = this.fGroup.controls["seleccionado"].value;

    let zona:ZonaModel2={
      nombre:nombre,
      color:color,
      descripcion:descripcion,
      parqueId:parseInt(parque)
    }
    
    console.log("Seleccionado ",parque);

    if(this.fGroup.invalid){
      alert("Faltan datos")
    }else{
    this.ZonaService.saveRecord(zona).subscribe({
      next:(data) =>{
        if(data){
          alert("Registro creado exitosamente");
          this.router.navigate(["/parameters/list-zona"])
        }else{
          alert("No se pudo crear el nuevo registro, por favor intentelo de nuevo");
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