import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ParkModel } from 'src/app/models/park.model';
import { ZonaModel } from 'src/app/models/zona.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ParkService } from 'src/app/services/parameters/park.service';
import { ZonaService } from 'src/app/services/parameters/zona.service';

@Component({
  selector: 'app-edit-zona',
  templateUrl: './edit-zona.component.html',
  styleUrls: ['./edit-zona.component.css']
})
export class EditZonaComponent implements OnInit {
  fGroup: FormGroup = new FormGroup ({});
  isIgual:boolean = false;
  seleccionado:ParkModel = new ParkModel()
  parques:ParkModel[] = []
  nombre:string = ''
  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ParkService:ParkService,
    private route:ActivatedRoute,
    private localStorage:LocalStorageService,
    private ZonaService:ZonaService
  ) { }

  ngOnInit(): void {
    this.BuildingForm();
    this.ParkList();
    this.SearchRequest2()
  }

  /**
   * Construccion del formulario con sus datos
   */
   BuildingForm(){
    this.fGroup = this.fb.group({
      id: ['',[Validators.required]],
      nombre: ['',[Validators.required]],
      color:['',[Validators.required]],
      descripcion:['',[Validators.required]],
      seleccionado:['',[Validators.required]],
    })
  }
  ParkList() {
    this.ParkService.getRecorList().subscribe({
      next: (data) => {
        console.log()
         this.parques = data;
      },error: (err) => {
       alert("Error obteniendo la información")   
    }
    })
  }
 
  SearchRequest2(){
    let id = this.route.snapshot.params["id"];
    console.log("ID ",id)
    this.ZonaService.getRecorByID(id+'').subscribe({
      next: (data)=>{
        this.ParkService.getRecorByID(data.parqueId+'').subscribe({
          next:(parque) =>{
            this.fGroup.controls["id"].setValue(data.id);
            this.fGroup.controls["nombre"].setValue(data.nombre);
            this.fGroup.controls["color"].setValue(data.color);
            this.fGroup.controls["descripcion"].setValue(data.descripcion);
            this.fGroup.controls["seleccionado"].setValue(data.parque?.id)
            this.nombre = parque.nombre;

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

  EditAction2(){
    let id = this.fGroup.controls["id"].value;
    let nombre = this.fGroup.controls["nombre"].value;
    let color = this.fGroup.controls["color"].value;
    let descripcion = this.fGroup.controls["descripcion"].value;
    let parqueId = this.fGroup.controls["seleccionado"].value;
   
    let datos:ZonaModel={
      id: id,
      nombre: nombre,
      color: color,
      descripcion:descripcion,
      parqueId: parseInt(parqueId) 
    }
     console.log(datos)
    
  
    if(this.fGroup.invalid){
      alert("Faltan datos")
    }else{
  
    this.ZonaService.editRecord(datos).subscribe({
      next:(data) =>{
        if(!data){
          alert("Registro Actualizado con exito");
          this.router.navigate(["/parameters/list-zona"])
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
