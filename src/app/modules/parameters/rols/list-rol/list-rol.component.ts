import { Component, OnInit } from '@angular/core';
import { ApisInfo } from 'src/app/config/apisInfo';
import { RolModel } from 'src/app/models/rol.model';
import { RolServiceService } from 'src/app/services/parameters/rol-service.service';

declare const OpenConfirmModal: any;
@Component({
  selector: 'app-list-rol',
  templateUrl: './list-rol.component.html',
  styleUrls: ['./list-rol.component.css']
})
export class ListRolComponent implements OnInit {
 

  constructor(
    private RolService: RolServiceService
  ) { }

  idToRemove: string = "";
  urlServer = ApisInfo.MS_SEG_URL;
  recordList:RolModel[] = [];

  
  ngOnInit(): void {
    this.ListRecords();
  }

  ListRecords() {

    this.RolService.getRecorList().subscribe({
      next: (data) => {
        this.recordList = data;
      },
      error: (err) => {
        alert("Error obteniendo la información")
      }
    });
  }

  ShowRemoveWindow(id: string) {
    OpenConfirmModal("¿Está seguro que dea elimminar el rol?")
    this.idToRemove = id;
  }

  /**
   * 
   * @param id 
   */
  RemoveRecord() {
    this.RolService.removeRecord(this.idToRemove).subscribe({
      next: (data) => {
        //this.ListRecords();
        this.recordList = this.recordList.filter(x => x._id != this.idToRemove);
        
      },
      error: (err) => {
        alert("Error obteniendo la información")
      }
    })
  }


}
