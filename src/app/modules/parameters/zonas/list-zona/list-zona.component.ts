import { Component, OnInit } from '@angular/core';
import { ApisInfo } from 'src/app/config/apisInfo';
import { cityModel } from 'src/app/models/city.model';
import { departmentModel } from 'src/app/models/department.model';
import { ZonaModel } from 'src/app/models/zona.model';
import { ZonaModel2 } from 'src/app/models/zona.model2';
import { CityService } from 'src/app/services/parameters/city.service';
import { DepartmentService } from 'src/app/services/parameters/department.service';
import { ParkService } from 'src/app/services/parameters/park.service';
import { ZonaService } from 'src/app/services/parameters/zona.service';
declare const OpenConfirmModal: any;
@Component({
  selector: 'app-list-zona',
  templateUrl: './list-zona.component.html',
  styleUrls: ['./list-zona.component.css']
})
export class ListZonaComponent implements OnInit {

  constructor(
    private CityService: CityService,
    private DepartmentService: DepartmentService
    ,private serviceZona:ZonaService,
    private servicePark:ParkService
  ) { }
  idToRemove: string = "";
  recordList: ZonaModel[]= [];
  urlServer = ApisInfo.MS_LOG_URL;
  fk_code_department_list:cityModel[] = [];

  department:departmentModel={
    id:'',
    nombre:''
  };

  ciudad:cityModel={
    id: '',
    nombre: '',
    postal: '',
    departamentoId: ''

  }
  

  ngOnInit(): void {
    this.ListRecords();
  }

  ListRecords() {
    this.serviceZona.getRecorList().subscribe({
      next: (data) => {
        console.log("AQUIIIII",data)
        data.forEach(Z => this.servicePark.getRecorByID(Z.parqueId).subscribe({
          next: (park) => {
            console.log("hola")
            let Zona:ZonaModel={
              id:Z.id,
              nombre:Z.nombre,
              color:Z.color,
              descripcion:Z.descripcion,
              parqueId:park.nombre  
          }
            this.recordList.push(Zona)
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
