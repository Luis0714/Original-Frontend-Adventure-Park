import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ParkService } from 'src/app/services/parameters/park.service';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-create-park',
  templateUrl: './create-park.component.html',
  styleUrls: ['./create-park.component.css']
})
export class CreateParkComponent implements OnInit {
  fGroup: FormGroup = new FormGroup({});
  
  constructor(
    private fb: FormBuilder,
    private secService: SecurityService,
    private parkService: ParkService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.BuildingForm();
  }
  /**
   * Construccion del formulario con sus datos
   */
  BuildingForm(){
    this.fGroup = this.fb.group({
      name:['',[Validators.required,Validators.minLength(5)]],
      details:['',[Validators.required],Validators.maxLength(50)]
    })
  }
  CreateParkAction(){
    let nombre = this.fGroup.controls["nombre"].value;
    let postal = this.fGroup.controls["postal"].value;
    let departamentoId = this.fGroup.controls["seleccionado"].value;
    console.log("Seleccionado", departamentoId)
    if(this.fGroup.invalid){
      alert("Faltan datos")
    }else{
      //console.log("nombre", nombre, "postal", postal, "departamento", departamentoId)
    this.parkService.RegisternewPARK(nombre, postal, departamentoId).subscribe({
      next:(data) =>{
        if(data){
          alert("Por favor revise la bandeja de entrada de su correo");
          this.router.navigate(["/parameters/list-park"])
        }else{
          alert("No se pudo crear la nueva ciudad, por favor intentelo de nuevo");
        }
      },
      error:(err) =>{
        console.log(err)
        alert("Error en el registro de Ciudad")
      }
    }
    );
  }
  }

  get fg(){
    return this.fGroup.controls;
  }
}
