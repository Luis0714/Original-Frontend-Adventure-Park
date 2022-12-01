import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/services/security.service';
import { CityService } from 'src/app/services/parameters/city.service';
import { departmentModel } from 'src/app/models/department.model';
import { departmentModel2 } from 'src/app/models/department.model2';
import { cityModel2 } from 'src/app/models/city.model2';

@Component({
  selector: 'app-create-city',
  templateUrl: './create-city.component.html',
  styleUrls: ['./create-city.component.css']
})
export class CreateCityComponent implements OnInit {
  fGroup: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private CityService:CityService
  ) { }

  ngOnInit(): void {
    this.BuildingForm();
  }

  /**
   * Construccion del formulario con sus datos
   */
   BuildingForm(){
    this.fGroup = this.fb.group({
      id:['',[Validators.required,Validators.minLength(5)]],
      nombre:['',[Validators.required],Validators.maxLength(50)],
      postal:['',[Validators.required],Validators.maxLength(5)],
      fk_code_department:['',[Validators.required],Validators.minLength(4)]
    })
  }

  CreateDepartmentAction(){
    let nombre = this.fGroup.controls["nombre"].value;
    let postal = this.fGroup.controls["postal"].value;
    let fk_code_department = this.fGroup.controls["departamentoId"].value;
    let datos:cityModel2={
      nombre:nombre,
      postal:postal,
      fk_code_department: fk_code_department
      
    }
    this.CityService.saveRecord(datos).subscribe({
      next:(data) =>{
        if(data){
          alert('Registro creado con exito')
          this.router.navigate(["/parameters/list-department"])
        }else{
          alert("Error al crear el registro");
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