import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ParkModel } from 'src/app/models/park.model';
import { planModel } from 'src/app/models/plans.model';
import { ParkService } from 'src/app/services/parameters/park.service';
import { PlansService } from 'src/app/services/parameters/plans.service';

@Component({
  selector: 'app-edit-plan',
  templateUrl: './edit-plan.component.html',
  styleUrls: ['./edit-plan.component.css']
})
export class EditPlanComponent implements OnInit {
  fGroup: FormGroup = new FormGroup({});
  parques: ParkModel[] = [];
  nombre:string='';
 
  constructor(
    private fb: FormBuilder,
    private PlanService: PlansService,
    private ParkService: ParkService,
    private router: Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.BuildingForm();
    this.SearchRequest();
    this.ListRecords();
  }
  BuildingForm(){
    this.fGroup = this.fb.group({
      id: ['',[]],
      nombre:['',[Validators.required]],
      color:['',[Validators.required]],
      valor:['',[Validators.required]],
      seleccionado:['',[Validators.required]]
  
    })
  }
  SearchRequest(){
    let id = this.route.snapshot.params["id"];
    console.log("ID ",id)
    this.PlanService.getRecorByID(id).subscribe({
      next: (data)=>{
        this.ParkService.getRecorByID(data.parqueId.toString()).subscribe({
          next: (parque)=>{
            this.fGroup.controls["id"].setValue(data.id);
            this.fGroup.controls["nombre"].setValue(data.nombre);
            this.fGroup.controls["color"].setValue(data.color);
            this.fGroup.controls["valor"].setValue(data.valor);
            this.fGroup.controls["seleccionado"].setValue(data.parqueId);
            this.nombre=parque.nombre
          },
          error:(err)=>{
            alert("Error obteniendo la informacion del registro");
          }
        })
        
      },
      error:(err)=>{
        alert("Error obteniendo la informacion del registro");
      }
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




  EditPlanAction(){
    console.log("Entreee");
    let id = this.fGroup.controls["id"].value;
    let nombre = this.fGroup.controls["nombre"].value;
    let color = this.fGroup.controls["color"].value;
    let valor = this.fGroup.controls["valor"].value;
    let parqueId = this.fGroup.controls["seleccionado"].value;
    let datos:planModel={
      id: id,
      nombre:nombre,
      color:color,
      valor:parseInt(valor),
      parqueId: parseInt(parqueId)
    }
    if(this.fGroup.invalid){
      alert("Faltan datos")
    }else{
    this.PlanService.editRecord(datos).subscribe({
      next:(data) =>{
        if(!data){
          alert('Registro editado con exito')
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
  