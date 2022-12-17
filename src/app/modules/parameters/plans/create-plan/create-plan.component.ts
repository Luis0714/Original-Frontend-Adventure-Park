import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ParkModel } from 'src/app/models/park.model';
import { planModel2 } from 'src/app/models/plans.model2';
import { ParkService } from 'src/app/services/parameters/park.service';
import { PlansService } from 'src/app/services/parameters/plans.service';

@Component({
  selector: 'app-create-plan',
  templateUrl: './create-plan.component.html',
  styleUrls: ['./create-plan.component.css']
})
export class CreatePlanComponent implements OnInit {
  fGroup: FormGroup = new FormGroup({});
  parques: ParkModel[]=[];
  seleccionado: ParkModel={
    id: '',
    nombre: '',
    direccion: '',
    cantidadVisitas: 0,
    logo: '',
    mapa: '',
    slogan: '',
    descripcion: '',
    ciudadId: 0,
    email:''
  }
     
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private PlanService: PlansService,
    private ParkService: ParkService
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
      nombre:['',[Validators.required,Validators.maxLength(50)]],
      color:['',[Validators.required,Validators.maxLength(50)]],
      valor:['',[Validators.required]],
      seleccionado:['',[Validators.required]]
    })
  }

  ListRecords() {
    this.ParkService.getRecorList().subscribe({
      next: (data) => {
        console.log()
         this.parques = data;
      },error: (err) => {
       alert("Error obteniendo la información")   
    }
    })
  }

  CreatePlanAction(){
    let nombre = this.fGroup.controls["nombre"].value;
    let color = this.fGroup.controls["color"].value;
    let valor = this.fGroup.controls["valor"].value;
    let parqueId = this.fGroup.controls["seleccionado"].value;
    if(this.fGroup.invalid){
      alert("Faltan datos")
    }else{
      let record: planModel2={
        nombre:nombre,
        color: color,
        valor: parseInt(valor),
        parqueId: parseInt(parqueId)
      }
      console.log(record, "RECORD")
    this.PlanService.RegisternewPlan(record).subscribe({
      next:(data) =>{
        console.log(data, "RECIBEEEEEE")
        if(data){
          alert('Registro creado con exito')
          this.router.navigate(["/parameters/list-plan"])
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

