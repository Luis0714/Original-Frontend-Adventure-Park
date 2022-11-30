import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/services/security.service';
import { DepartmentService } from 'src/app/services/parameters/department.service';
import { departmentModel } from 'src/app/models/department.model';
import { departmentModel2 } from 'src/app/models/department.model2';



@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.css']
})
export class CreateDepartmentComponent implements OnInit {
  fGroup: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private DepartmentService:DepartmentService
  ) { }

  ngOnInit(): void {
    this.BuildingForm();
  }
  /**
   * Construccion del formulario con sus datos
   */
  BuildingForm(){
    this.fGroup = this.fb.group({
      id:['',[Validators.required],Validators.minLength(5)],
      nombre:['',[Validators.required],Validators.maxLength(50)]
    })
  }

  CreateDepartmentAction(){
    let nombre = this.fGroup.controls["nombre"].value;
    let datos:departmentModel2={
      nombre:nombre
    }
    if(this.fGroup.invalid){
      alert("Faltan datos")
    }else{
    this.DepartmentService.saveRecord(datos).subscribe({
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
}
  get fg(){
    return this.fGroup.controls;
  }


}