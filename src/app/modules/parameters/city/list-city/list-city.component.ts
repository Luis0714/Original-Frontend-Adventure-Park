import { Component, OnInit } from '@angular/core';
import { ApisInfo } from 'src/app/config/apisInfo';
import { CityModel } from 'src/app/models/city.model';
import { cityModel2 } from 'src/app/models/city.model2';
import { departmentModel } from 'src/app/models/department.model';
import { departmentModel2 } from 'src/app/models/department.model2';
import { CityService } from 'src/app/services/parameters/city.service';
import { DepartmentService} from 'src/app/services/parameters/department.service'
declare const OpenConfirmModal: any;
@Component({
  selector: 'app-list-city',
  templateUrl: './list-city.component.html',
  styleUrls: ['./list-city.component.css']
})
export class ListCityComponent implements OnInit {

  constructor(
    private CityService: CityService,
    private DepartmentService: DepartmentService
  ) { }
  idToRemove: string = "";
  recordList: CityModel[]= [];
  urlServer = ApisInfo.MS_LOG_URL;
  fk_code_department_list:CityModel[] = [];

  department:departmentModel={
    id:'',
    nombre:''
  };
  

  ngOnInit(): void {
    this.ListRecords();
  }

  ListRecords() {
    this.CityService.getRecorList().subscribe({
      next: (data) => {
        console.log("AQUIIIII",data)
        data.forEach(D => this.DepartmentService.getRecorByID2(D.id).subscribe({
          next: (department) => {
            console.log("hola")
            D.fk_code_department = department.nombre;
            this.recordList.push(D)
          },
          error:(err)=>{
            console.log("Error obteniendo el nombre del departamento")
          }
        }))
        },
        error: (err) => {
         alert("Error obteniendo la información")
        }
      });
    }

    GetNameRol(id:string):string{
      let nombre = ''
       this.DepartmentService.getRecorByID2(id).subscribe({
        next:(departamento)=>{
          nombre = departamento.nombre
          console.log("nombre ",nombre)
          return nombre
        },
        error:(err)=>{
          console.log("Erro obteniendo el nombre del rol")
        }
      })
      return nombre;
    }

  ShowRemoveWindow(id: string) {
    OpenConfirmModal("¿Está seguro que dea elimminar el departamento?")
    this.idToRemove = id;
  }

  /**
   * 
   * @param id 
   */
  RemoveRecord() {
    this.CityService.removeRecord(this.idToRemove).subscribe({
      next: (data) => {
        //this.ListRecords();
        this.recordList = this.recordList.filter(x => x.id != this.idToRemove);
        
      },
      error: (err) => {
        alert("Error obteniendo la información")
      }
    })
  }
}
