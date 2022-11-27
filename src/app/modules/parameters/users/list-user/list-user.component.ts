import { Component, OnInit } from '@angular/core';
import { ApisInfo } from 'src/app/config/apisInfo';
import { RolModel } from 'src/app/models/rol.model';
import { UserModel } from 'src/app/models/user.model';
import { UserModel2 } from 'src/app/models/user.model2';
import { RolServiceService } from 'src/app/services/parameters/rol-service.service';
import { UserService } from 'src/app/services/parameters/user.service';
declare const OpenConfirmModal: any;
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  constructor(
    private UserService: UserService,
    private RolService:RolServiceService
  ) { }

  idToRemove: string = "";
  urlServer = ApisInfo.MS_SEG_URL;
  recordList:UserModel2[] = [];
  Rollist:UserModel2[] = [];

  rol:RolModel={
    _id:'',
    nombre:'',
    detalles:''
  };
rolname:string='';
  
  ngOnInit(): void {
    this.ListRecords();
  }

  ListRecords() {
    this.UserService.getRecorList().subscribe({
      next: (data) => {
        this.recordList = data;
      },
      error: (err) => {
       alert("Error obteniendo la información")
      }
    });
  }
  

  ShowRemoveWindow(id: string) {
    OpenConfirmModal("¿Está seguro que desea elimminar?")
    this.idToRemove = id;
  }

  /**
   * 
   * @param id 
   */
  RemoveRecord() {
    this.UserService.removeRecord(this.idToRemove).subscribe({
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
