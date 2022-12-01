import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/services/security.service';
import { CityService } from 'src/app/services/parameters/city.service';
import { departmentModel } from 'src/app/models/department.model';
import { departmentModel2 } from 'src/app/models/department.model2';
import { cityModel2 } from 'src/app/models/city.model2';
import { DepartmentService } from 'src/app/services/parameters/department.service';

@Component({
  selector: 'app-create-city',
  templateUrl: './create-city.component.html',
  styleUrls: ['./create-city.component.css']
})
export class CreateCityComponent implements OnInit {
  fGroup: FormGroup = new FormGroup({});
  departamentos: departmentModel[] = [];
  seleccionado: departmentModel ={
    id:'',
    nombre:''
  };



  constructor(
    private fb: FormBuilder,
    private router: Router,
    private CityService:CityService,
    private DepartamentoService: DepartmentService
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
      postal:['',[Validators.required,Validators.maxLength(5)]],
      seleccionado:['',[Validators.required]]
    })
  }

  ListRecords() {
    this.DepartamentoService.getRecorList().subscribe({
      next: (data) => {
        console.log()
         this.departamentos = data;
      },error: (err) => {
       alert("Error obteniendo la información")   
    }
    })
  }

  CreateCityAction(){
    let nombre = this.fGroup.controls["nombre"].value;
    let postal = this.fGroup.controls["postal"].value;
    let departamentoId = this.fGroup.controls["seleccionado"].value;
    console.log("Seleccionado", departamentoId)
    if(this.fGroup.invalid){
      alert("Faltan datos")
    }else{
      //console.log("nombre", nombre, "postal", postal, "departamento", departamentoId)
    this.CityService.RegisternewCity(nombre, postal, departamentoId).subscribe({
      next:(data) =>{
        if(data){
          alert("Por favor revise la bandeja de entrada de su correo");
          this.router.navigate(["/parameters/list-city"])
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
