import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VentaPlanModel2 } from 'src/app/models/plan.venta.model2';
import { PlansService } from 'src/app/services/parameters/plans.service';
import { VentaPlansService } from 'src/app/services/parameters/venta-plans.service';

@Component({
  selector: 'app-tarejeta-validate',
  templateUrl: './tarejeta-validate.component.html',
  styleUrls: ['./tarejeta-validate.component.css']
})
export class TarejetaValidateComponent implements OnInit {

  fGroup: FormGroup = new FormGroup({})
  stado:boolean=false
  cantidad:number= 0;
    constructor(
      private fb: FormBuilder,
      private route:ActivatedRoute,
      private PlanVentaService: VentaPlansService,
      private planService:PlansService,
      private router:Router
    ) { }
  
    ngOnInit(): void {
      this.BuildingForm()
    }
    
  
    BuildingForm(){
      this.fGroup = this.fb.group({
        nombre:['',[Validators.required,Validators.minLength(3)]],
        numero:['',[Validators.required,Validators.maxLength(16), Validators.minLength(16)]],
        fecha:['',[Validators.required]],
        csv:['',[Validators.required, Validators.maxLength(3), Validators.minLength(3)]],
        cantidad:[0,[Validators.required,Validators.min(1)]]
      })
    }
  
    ValidarTarjeta(){
      if (this.fGroup.invalid){
        alert("Tarjeta Invalida")
      }else{
        let id = this.route.snapshot.params["id"];
        this.planService.getRecorByID(id).subscribe({
          next: (data)=>{
            console.log("RESPUESTA ",data);
            let total =(data.valor*this.cantidad)
            let  imp = (total*0.19)
            let datos:VentaPlanModel2 ={
              fecha: new Date(),
              impuestos:imp,
              total:total,
              cant:this.cantidad,
              planesId:parseInt(id) 
            }
          
            console.log("VENTA ",datos)
            this.PlanVentaService.saveRecord(datos).subscribe({
              next:(ventaCreada)=>{
                if(ventaCreada){
                  alert("compra exitosa")
                  this.router.navigate(["/parameters/list-plan"])
                }
              },
              error:(err)=>{
                alert("error  guardando la venta")
              }
            })
              
          },
          error:(err)=>{
            alert("Error obteniendo la informacion del plan");
          }
        })
         
        
    }
    }
    
  
    GuargarCantidad(){
      this.cantidad= parseInt(this.fGroup.controls["cantidad"].value.toString()) 
      this.stado=true
    }
  }
  
