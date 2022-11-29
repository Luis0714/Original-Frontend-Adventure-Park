import { Component, OnInit } from '@angular/core';
import { ApisInfo } from 'src/app/config/apisInfo';
import { CityModel } from 'src/app/models/city.model';
import { CityService } from 'src/app/services/parameters/city.service';

declare const OpenConfirmModal: any;
@Component({
  selector: 'app-list-city',
  templateUrl: './list-city.component.html',
  styleUrls: ['./list-city.component.css']
})
export class ListCityComponent implements OnInit {

  constructor(
    private CityService: CityService
  ) { }

  idToRemove: string = "";
  recordList: CityModel[]= [];
  urlServer = ApisInfo.MS_LOG_URL;

  ngOnInit(): void {
    this.ListRecords();
  }
  ListRecords() {

    this.CityService.getRecorList().subscribe({
      next: (data) => {
        this.recordList = data;
        console.log(this.recordList)
        
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
