import { Component, OnInit } from '@angular/core';
import { ApisInfo } from 'src/app/config/apisInfo';
import { cityModel } from 'src/app/models/city.model';
import { departmentModel } from 'src/app/models/department.model';
import { ZonaModel } from 'src/app/models/zona.model';
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
  page: number =1;

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
      next: (data) =>{
        this.recordList = data
      },   
      error: (err) => {
         alert("Error obteniendo la información")
        }
      });
    }

    

  ShowRemoveWindow(id: string) {
    console.log("El ID ",id)
    OpenConfirmModal("¿Está seguro que dea elimminar el departamento?")
    this.idToRemove = id;
  }

  /**
   * 
   * @param id 
   */
  RemoveRecord() {
    this.serviceZona.removeRecord(this.idToRemove).subscribe({
      next: (data) => {
        //this.ListRecords();
        this.recordList = this.recordList.filter(x => x.id != parseInt(this.idToRemove));
      },
      error: (err) => {
        alert("Error obteniendo la información")
      }
    })
  }
}
