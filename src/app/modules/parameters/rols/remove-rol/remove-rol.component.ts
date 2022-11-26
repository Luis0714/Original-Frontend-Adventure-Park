import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RolServiceService } from 'src/app/services/parameters/rol-service.service';

@Component({
  selector: 'app-remove-rol',
  templateUrl: './remove-rol.component.html',
  styleUrls: ['./remove-rol.component.css']
})
export class RemoveRolComponent implements OnInit {
 RolName: string = "";

  constructor(
    private route: ActivatedRoute,
    private RolService:RolServiceService
  ) { }

  ngOnInit(): void {
    this.SearchRecord();
  }

  SearchRecord() {
    let id = this.route.snapshot.params["_id"];
    this.RolService.getRecorByID(id).subscribe({
      next: (data) => {
        this.RolName = data.nombre;
      },
      error: (err) => {
        alert("Error obteniendo el registro")
      }
    })
  }

  RemoveRecord() {
    let id = this.route.snapshot.params["_id"];
    this.RolService.removeRecord(id).subscribe({
      next: (data) => {
        alert("Eliminado correctamente");
      },
      error: (err) => {
        alert("Este rol está asociado a un usuario")
      }
    });
  }
}
