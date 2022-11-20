import { Component, OnInit } from '@angular/core';
import { RolModel } from 'src/app/models/rol.model';
import { RolServiceService } from 'src/app/services/parameters/rol-service.service';

@Component({
  selector: 'app-list-rol',
  templateUrl: './list-rol.component.html',
  styleUrls: ['./list-rol.component.css']
})
export class ListRolComponent implements OnInit {
  recordList: RolModel[] = [];

  constructor(
    private RolService: RolServiceService
  ) { }

  ngOnInit(): void {
    this.RolService.getRecorList().subscribe({
      next:(data) =>{
        this.recordList = data;
      },
      error:(err) =>{
        alert("error obteniendo la informacion de los roles")
      }
    });
  }

}
