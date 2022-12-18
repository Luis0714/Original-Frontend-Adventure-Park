import { Component, OnInit } from '@angular/core';
import { ApisInfo } from 'src/app/config/apisInfo';
import { DefaultValues } from 'src/app/config/default-values';
import { cityModel } from 'src/app/models/city.model';
import { ParkModel } from 'src/app/models/park.model';
import { UserModel } from 'src/app/models/user.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { CatergoriaService } from 'src/app/services/parameters/catergoria.service';
import { CityService } from 'src/app/services/parameters/city.service';
import { ParkService } from 'src/app/services/parameters/park.service';
import { SecurityService } from 'src/app/services/security.service';

declare const OpenConfirmModal: any;
@Component({
  selector: 'app-list-park',
  templateUrl: './list-park.component.html',
  styleUrls: ['./list-park.component.css']
})
export class ListParkComponent implements OnInit {
  isLogged: boolean = false;
  page: number =1;
  
  rolId:string = '';
  rolIdAdmin:string = DefaultValues.RolIdSuperAdmin;
  name:string = '';

  ciudad:cityModel={
    id: '',
    nombre: '',
    postal: '',
    departamentoId: ''
  }
  
  

  constructor(
    private parkService: ParkService,
    private SecuritySevice: SecurityService,
    private LocalStorage: LocalStorageService,
    private cityService: CityService,
    private categoriaService: CatergoriaService
  ) { 
    
  }

  idToRemove: number = 0;
  recordList: ParkModel[]= [];
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
    this.parkService.getRecorList().subscribe({
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
    this.parkService.removeRecord(this.idToRemove).subscribe({
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
