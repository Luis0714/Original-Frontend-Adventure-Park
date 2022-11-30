import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { departmentModel } from 'src/app/models/department.model';
import { departmentModel2 } from 'src/app/models/department.model2';
import { DepartmentService } from 'src/app/services/parameters/department.service';
@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.css']
})
export class EditDepartmentComponent implements OnInit {
  fGroup: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private DepartmentService: DepartmentService,
    private router: Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.BuildingForm();
    this.SearchRequest();
  }
/**
   * Construccion del formulario con sus datos
   */
 BuildingForm(){
  this.fGroup = this.fb.group({
    id: ['',[]],
    nombre:['',[Validators.required,Validators.minLength(5)]],
  })
}
SearchRequest(){
  let id = this.route.snapshot.params["id"];
  console.log("ID ",id)
  this.DepartmentService.getRecorByID(id).subscribe({
    next: (data)=>{
      console.log("DATA ",data);
      this.fGroup.controls["id"].setValue(data.id);
      this.fGroup.controls["nombre"].setValue(data.nombre);
    },
    error:(err)=>{
      alert("Error obteniendo la informacion del registro");
    }
  })

  
}
EditDepartmentAction(){
  console.log("Entreee");
  
  let id = this.fGroup.controls["id"].value;
  let nombre = this.fGroup.controls["nombre"].value;
  let datos:departmentModel={
    id: id,
    nombre:nombre
    
  }
  if(this.fGroup.invalid){
    alert("Faltan datos")
  }else{
  this.DepartmentService.editRecord(datos).subscribe({
    next:(data) =>{
      if(!data){
        alert('Registro editado con exito')
        this.router.navigate(["/parameters/list-department"])
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
