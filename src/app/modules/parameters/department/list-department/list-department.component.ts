import { Component, OnInit } from '@angular/core';
import { ApisInfo } from 'src/app/config/apisInfo';
import { departmentModel } from 'src/app/models/department.model';
import { DepartmentService } from 'src/app/services/parameters/department.service';

declare const OpenConfirmModal: any;
@Component({
  selector: 'app-list-department',
  templateUrl: './list-department.component.html',
  styleUrls: ['./list-department.component.css']
})
export class ListDepartmentComponent implements OnInit {
  page: number =0;

  constructor(
    private DepartmentService: DepartmentService
  ) { }

  idToRemove: string = "";
  recordList: departmentModel[]= [];
  urlServer = ApisInfo.MS_LOG_URL;

  ngOnInit(): void {
    this.ListRecords();
  }
  ListRecords() {
    this.DepartmentService.getRecorList().subscribe({
      next: (data) => {
        this.recordList = data;
        console.log("departamentos ",this.recordList)
        
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
    this.DepartmentService.removeRecord(this.idToRemove).subscribe({
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
