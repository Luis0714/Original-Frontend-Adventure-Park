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
       data.forEach(U => this.RolService.getRecorByID2(U.rolId).subscribe({
        next:(rol)=>{
         U.rolId = rol.nombre;
         console.log("UUU ", U)
         this.recordList.push(U)
        },
      
      }))
      },
      error: (err) => {
       alert("Error obteniendo la información")
      }
    });
  }
  
   GetNameRol(id:string):string{
    let nombre = 'auuu'
     this.RolService.getRecorByID2(id).subscribe({
      next:(rol)=>{
        nombre = rol.nombre
        console.log("nombre ",nombre)
        return nombre
      },
      error:(err)=>{
        console.log("Error obteniendo el nombre del rol")
      }
    })
    return nombre;
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
