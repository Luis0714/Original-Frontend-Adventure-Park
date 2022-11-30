import { Component, OnInit } from '@angular/core';
import { ApisInfo } from 'src/app/config/apisInfo';
import { cityModel } from 'src/app/models/city.model';
import { cityModel2 } from 'src/app/models/city.model2';
import { cityModel3 } from 'src/app/models/city.model3';
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
  recordList: cityModel3[]= [];
  urlServer = ApisInfo.MS_LOG_URL;
  fk_code_department_list:cityModel[] = [];

  department:departmentModel={
    id:'',
    nombre:''
  };

  ciudad:cityModel3={
    id: '',
    nombre: '',
    postal: '',
    departamentoId: ''

  }
  

  ngOnInit(): void {
    this.ListRecords();
  }

  ListRecords() {
    this.CityService.getRecorList().subscribe({
      next: (data) => {
        console.log("AQUIIIII",data)
        data.forEach(C => this.DepartmentService.getRecorByID2(C.departamentoId).subscribe({
          next: (departamento) => {
            console.log("hola")
            this.ciudad={
              id: C.id + '',
              nombre: C.nombre,
              postal: C.postal,
              departamentoId: departamento.nombre
            }
            this.recordList.push(this.ciudad)
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
