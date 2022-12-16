import { Component, OnInit } from '@angular/core';
import { ApisInfo } from 'src/app/config/apisInfo';
import { DefaultValues } from 'src/app/config/default-values';
import { atraccionModel } from 'src/app/models/atraccion.model';
import { UserModel } from 'src/app/models/user.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { AttractionService } from 'src/app/services/parameters/attraction.service';
import { ZonaService } from 'src/app/services/parameters/zona.service';
import { SecurityService } from 'src/app/services/security.service';
declare const OpenConfirmModal: any;
@Component({
  selector: 'app-list-attraction',
  templateUrl: './list-attraction.component.html',
  styleUrls: ['./list-attraction.component.css']
})
export class ListAttractionComponent implements OnInit {
  isLogged: boolean = false;
  
  rolId:string = '';
  rolIdAdmin:string = DefaultValues.RolIdSuperAdmin;
  name:string = '';


  constructor(
    private atraccionService: AttractionService,
    private zonaService: ZonaService,
    private SecuritySevice: SecurityService,
    private LocalStorage: LocalStorageService
  ) { }
  idToRemove: number = 0;
  recordList: atraccionModel[]= [];
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
    this.atraccionService.getRecorList().subscribe({
      next: (data) => {
        this.recordList = data;        },
        error: (err) => {
         alert("Error obteniendo la información")
        }
      });
    }
    

  ShowRemoveWindow(id: string) {
    OpenConfirmModal("¿Está seguro que dea elimminar el Parque?")
    this.idToRemove = parseInt(id);
  }

  
  /**
   * 
   * @param id 
   */
   RemoveRecord() {
    this.atraccionService.removeRecord(this.idToRemove).subscribe({
      next: (data) => {
        //this.ListRecords();
        this.recordList = this.recordList.filter(x => parseInt(x.id) != this.idToRemove);
        
      },
      error: (err) => {
        alert("Error obteniendo la información")
      }
    })
  }
  }