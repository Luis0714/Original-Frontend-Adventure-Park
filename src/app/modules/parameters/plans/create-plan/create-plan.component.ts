import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { planModel2 } from 'src/app/models/plans.model2';
import { PlansService } from 'src/app/services/parameters/plans.service';

@Component({
  selector: 'app-create-plan',
  templateUrl: './create-plan.component.html',
  styleUrls: ['./create-plan.component.css']
})
export class CreatePlanComponent implements OnInit {
  fGroup: FormGroup = new FormGroup({});
     
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private PlanService: PlansService
  ) { }

  ngOnInit(): void {
    this.BuildingForm();
  }

/**
   * Construccion del formulario con sus datos
   */
  BuildingForm(){
    this.fGroup = this.fb.group({
      nombre:['',[Validators.required,Validators.maxLength(50)]],
      color:['',[Validators.required,Validators.maxLength(5)]],
      valor:['',[Validators.required]],
      parqueId:['',[Validators.required]]
    })
  }
  CreatePlanAction(){
    let nombre = this.fGroup.controls["nombre"].value;
    let color = this.fGroup.controls["color"].value;
    let valor = this.fGroup.controls["valor"].value;
    let parqueId = this.fGroup.controls["parqueId"].value;
    let datos:planModel2={
      nombre:nombre,
      color:color,
      valor: valor,
      parqueId: parqueId
    }
    console.log(datos, "ENVIAAAAAAAAAAA")
    this.PlanService.saveRecord(datos).subscribe({
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
  get fg(){
    return this.fGroup.controls;
  }
}

