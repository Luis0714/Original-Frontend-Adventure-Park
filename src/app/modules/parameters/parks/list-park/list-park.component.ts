import { Component, OnInit } from '@angular/core';
import { ApisInfo } from 'src/app/config/apisInfo';
import { ParkModel } from 'src/app/models/park.model';
import { ParkService } from 'src/app/services/parameters/park.service';

declare const OpenConfirmModal: any;
@Component({
  selector: 'app-list-park',
  templateUrl: './list-park.component.html',
  styleUrls: ['./list-park.component.css']
})
export class ListParkComponent implements OnInit {

  constructor(
    private parkService: ParkService
  ) { 
    
  }

  idToRemove: string = "";
  recordList: ParkModel[]= [];
  urlServer = ApisInfo.MS_LOG_URL;

  ngOnInit(): void {
    this.ListRecords();
  }

  ListRecords() {
    this.parkService.getRecorList().subscribe({
      next: (data) => {
        this.recordList = data;
        console.log("parques ",this.recordList)
        
      },
      error: (err) => {
        alert("Error obteniendo la información")
      }
    })
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
    this.parkService.removeRecord(this.idToRemove).subscribe({
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
