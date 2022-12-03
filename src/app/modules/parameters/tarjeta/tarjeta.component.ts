import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { VentaPlanModel } from 'src/app/models/venta-plans.model';
import { VentaPlansService } from 'src/app/services/parameters/venta-plans.service';
import { CreatePlanComponent } from '../plans/create-plan/create-plan.component';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css']
})
export class TarjetaComponent implements OnInit {
fGroup: FormGroup = new FormGroup({})
  constructor(
    private fb: FormBuilder,
    private route:ActivatedRoute,
    private CreatePlanVentaService: VentaPlansService
  ) { }

  ngOnInit(): void {
  }

  BuildingForm(){
    this.fGroup = this.fb.group({
      nombre:['',[Validators.required,Validators.minLength(3)]],
      numero:['',[Validators.required,Validators.maxLength(16), Validators.minLength(16)]],
      fecha:['',[Validators.required]],
      csv:['',[Validators.required, Validators.maxLength(3), Validators.minLength(3)]],
      cant:['',[Validators.required]]
    })
  }

  ValidarTarjeta(){
    let ventaPlan: VentaPlanModel=new VentaPlanModel()
    if (this.fGroup.invalid){
      alert("Tarjeta Invalida")
    }else{
      let id = this.route.snapshot.params["id"];
      console.log("ID ",id)
      this.CreatePlanVentaService.getRecorByID(id).subscribe({
        next: (data)=>{
          console.log("VENTA PLAN ",data);
          ventaPlan=data
          ventaPlan.planesId=id
          ventaPlan.fecha=Date.now()+''
          ventaPlan.cant=this.fGroup.controls["cant"].value
          //ventaPlan.total=() CALCULAR EL TOTAL DE LA VENTA CON IMPUESTO
          this.CreatePlanVentaService.saveRecord(ventaPlan).subscribe({
            next: (data)=>{
              console.log("RESPUESTA ",data);
              
            },
            error:(err)=>{
              alert("Error obteniendo la informacion del registro");
            }
          })
        
          
          alert("Aqui debo guardar el registro de la compra")
        
        },
        error:(err)=>{
          alert("Error obteniendo la informacion del registro");
        }
      })
      
  }
  }}
