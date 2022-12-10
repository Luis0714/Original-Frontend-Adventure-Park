import { Component, OnInit } from '@angular/core';
import { ApisInfo } from 'src/app/config/apisInfo';
import { DefaultValues } from 'src/app/config/default-values';
import { CategoriaModel } from 'src/app/models/categoria.model';
import { UserModel } from 'src/app/models/user.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { CatergoriaService } from 'src/app/services/parameters/catergoria.service';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogged: boolean = false;
  rolId:string = '';
  name:string = '';
  rolIdAdmin:string = DefaultValues.RolIdSuperAdmin;
  rolIdAuxiliar:string = DefaultValues.RolIdauxiliar;
  rolIdVisitante:string = DefaultValues.RolIdVisitante;

  constructor(private SecuritySevice: SecurityService,
    private LocalStorage:LocalStorageService,
    ) { }

  ngOnInit(): void {
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

}
