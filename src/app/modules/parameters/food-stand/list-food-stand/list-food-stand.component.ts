import { Component, OnInit } from '@angular/core';
import { ApisInfo } from 'src/app/config/apisInfo';
import { DefaultValues } from 'src/app/config/default-values';
import { FoodStandModel } from 'src/app/models/food-stand.model';
import { UserModel } from 'src/app/models/user.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { FoodStandService } from 'src/app/services/parameters/food-stand.service';
import { SecurityService } from 'src/app/services/security.service';
declare const OpenConfirmModal: any;

@Component({
  selector: 'app-list-food-stand',
  templateUrl: './list-food-stand.component.html',
  styleUrls: ['./list-food-stand.component.css']
})
export class ListFoodStandComponent implements OnInit {
  isLogged: boolean = false;
  rolId:string = '';
  rolIdAdmin:string = DefaultValues.RolIdSuperAdmin;
  name:string = '';
  constructor(
    private FoodStandService: FoodStandService,
    private SecuritySevice: SecurityService,
    private LocalStorage: LocalStorageService
  ) { }
  idToRemove: string = '';
  //recordList: planModel[]= [];
  urlServer = ApisInfo.MS_LOG_URL;

  ngOnInit(): void {
    //this.ListRecords();
    this.SecuritySevice.GetUserData().subscribe({
      next:(data:UserModel)=>{
        this.name = data.nombre.substring(0,(data.nombre.length-8));
        this.isLogged = data.isLogged;
        this.rolId = this.LocalStorage.GetRolId();
      },
      error: (err) =>{

      }
    })

  }
  /*
  ListRecords() {
    this.FoodStandService.getRecorList().subscribe({
      next: (data) => {
        this.recordList = data;
        console.log("Planes ",this.recordList)
        
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
  /*
  RemoveRecord() {
    this.FoodStandService.removeRecord(this.idToRemove).subscribe({
      next: (data) => {
        //this.ListRecords();
        this.recordList = this.recordList.filter(x => x.id != this.idToRemove);
        
      },
      error: (err) => {
        alert("Error obteniendo la información")
      }
    })
  }
*/
}
