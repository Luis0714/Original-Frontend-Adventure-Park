import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { planModel } from 'src/app/models/plans.model';
import { PlansService } from 'src/app/services/parameters/plans.service';

@Component({
  selector: 'app-edit-plan',
  templateUrl: './edit-plan.component.html',
  styleUrls: ['./edit-plan.component.css']
})
export class EditPlanComponent implements OnInit {
  fGroup: FormGroup = new FormGroup({});
  planes: planModel[] = [];
  seleccionado: planModel ={
    id: '',
    nombre: '',
    color: '',
    valor: 0,
    parqueId: 0
  };
  constructor(
    private fb: FormBuilder,
    private PlanService: PlansService,
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
        console.log("DATA ",data);
        this.fGroup.controls["id"].setValue(data.id);
        this.fGroup.controls["nombre"].setValue(data.nombre);
        this.fGroup.controls["color"].setValue(data.color);
        this.fGroup.controls["valor"].setValue(data.valor);
        this.fGroup.controls["seleccionado"].setValue(data.parqueId);
      },
      error:(err)=>{
        alert("Error obteniendo la informacion del registro");
      }
    })
  }

  ListRecords() {
    this.PlanService.getRecorList().subscribe({
      next: (data) => {
        console.log()
         this.planes = data;
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
  