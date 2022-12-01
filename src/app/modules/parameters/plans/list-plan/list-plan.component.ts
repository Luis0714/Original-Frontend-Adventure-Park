import { Component, OnInit } from '@angular/core';
import { ApisInfo } from 'src/app/config/apisInfo';
import { DefaultValues } from 'src/app/config/default-values';
import { planModel } from 'src/app/models/plans.model';
import { UserModel } from 'src/app/models/user.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PlansService } from 'src/app/services/parameters/plans.service';
import { SecurityService } from 'src/app/services/security.service';
declare const OpenConfirmModal: any;
@Component({
  selector: 'app-list-plan',
  templateUrl: './list-plan.component.html',
  styleUrls: ['./list-plan.component.css']
})
export class ListPlanComponent implements OnInit {
  isLogged: boolean = false;
  rolId:string = '';
  rolIdAdmin:string = DefaultValues.RolIdSuperAdmin;
  name:string = '';
  constructor(
    private PlanService: PlansService,
    private SecuritySevice: SecurityService,
    private LocalStorage: LocalStorageService
  ) { }

  idToRemove: number = 0;
  recordList: planModel[]= [];
  urlServer = ApisInfo.MS_LOG_URL;
  
  ngOnInit(): void {
    this.ListRecords();
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
  ListRecords() {
    this.PlanService.getRecorList().subscribe({
      next: (data) => {
        this.recordList = data;
        console.log("PLanes ",this.recordList)
      },
      error: (err) => {
        alert("Error obteniendo la información")
      }
    });
  }
  ShowRemoveWindow(id: number) {
    OpenConfirmModal("¿Está seguro que dea elimminar el departamento?")
    this.idToRemove = id;
  }

  /**
   * 
   * @param id 
   */
  RemoveRecord() {
    this.PlanService.removeRecord(this.idToRemove).subscribe({
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
