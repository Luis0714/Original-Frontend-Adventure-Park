import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApisInfo } from 'src/app/config/apisInfo';
import { DefaultValues } from 'src/app/config/default-values';
import { UserModel } from 'src/app/models/user.model';
import { VentaPlanModel } from 'src/app/models/venta-plans.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { VentaPlansService } from 'src/app/services/parameters/venta-plans.service';
import { SecurityService } from 'src/app/services/security.service';
import { planModel} from 'src/app/models/plans.model'
import { PlansService } from 'src/app/services/parameters/plans.service';
declare const OpenConfirmModal: any;
@Component({
  selector: 'app-list-venta-plan',
  templateUrl: './list-venta-plan.component.html',
  styleUrls: ['./list-venta-plan.component.css']
})
export class ListVentaPlanComponent implements OnInit {
  isLogged: boolean = false;
  rolId:string = '';
  rolIdAdmin:string = DefaultValues.RolIdSuperAdmin;
  name:string = '';
  nombre: string = '';
  venta:VentaPlanModel = new VentaPlanModel()


  constructor(
    private VentaPlanService: VentaPlansService,
    private SecurityService: SecurityService,
    private LocalStorage: LocalStorageService,
    private PlanService: PlansService
  ) { }
  idToRemove: string = '';
  recordList: VentaPlanModel[]= [];
  urlServer = ApisInfo.MS_LOG_URL;
  ngOnInit(): void {
    this.ListRecords();
    this.SecurityService.GetUserData().subscribe({
      next:(data:UserModel)=>{
        this.name = data.nombre.substring(0,(data.nombre.length-8));
        this.isLogged = data.isLogged;
        this.rolId = this.LocalStorage.GetRolId();
      },
      error: (err) =>{

      }
    });
  /*
    this.PlanService.getRecorList().subscribe({
      next:(data:planModel)=>{
        this.nombre = data.nombre

      },
      error:(err) =>{

      }
    })
    */
  }


  ListRecords() {
 
    this.VentaPlanService.getRecorList().subscribe({
      next: (data) => {
      
        
        this.recordList = data;
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
    this.VentaPlanService.removeRecord(this.idToRemove).subscribe({
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
