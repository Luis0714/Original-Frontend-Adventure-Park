import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { cityModel } from 'src/app/models/city.model';
import { CityService } from 'src/app/services/parameters/city.service';

@Component({
  selector: 'app-edit-city',
  templateUrl: './edit-city.component.html',
  styleUrls: ['./edit-city.component.css']
})
export class EditCityComponent implements OnInit {
  fGroup: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private CityService: CityService,
    private router: Router,
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
    nombre:['',[Validators.required]],
    postal:['',[Validators.required]],
    departamentoId:['',[Validators.required]]

  })
}
SearchRequest(){
  let id = this.route.snapshot.params["id"];
  console.log("ID ",id)
  this.CityService.getRecorByID(id).subscribe({
    next: (data)=>{
      console.log("DATA ",data);
      this.fGroup.controls["id"].setValue(data.id);
      this.fGroup.controls["nombre"].setValue(data.nombre);
      this.fGroup.controls["postal"].setValue(data.postal);
      this.fGroup.controls["departamentoId"].setValue(data.departamentoId);
      
    },
    error:(err)=>{
      alert("Error obteniendo la informacion del registro");
    }
  })

  
}
EditCityAction(){
  console.log("Entreee");
  let id = this.fGroup.controls["id"].value;
  let nombre = this.fGroup.controls["nombre"].value;
  let postal = this.fGroup.controls["postal"].value;
  let departamentoId = this.fGroup.controls["departamentoId"].value;
  let datos:cityModel={
    id: id,
    nombre:nombre,
    postal:postal,
    departamentoId:departamentoId
  }
  if(this.fGroup.invalid){
    alert("Faltan datos")
  }else{
  this.CityService.editRecord(datos).subscribe({
    next:(data) =>{
      if(!data){
        alert('Registro editado con exito')
        this.router.navigate(["/parameters/list-city"])
      }
    },
    error:(err) =>{
      console.log(err)
      alert("Se ha presentado un fallo creacion del registro")
    }
})
  }
}
get fg(){
  return this.fGroup.controls;
}
}




